<?php

namespace App\Http\Controllers\Api\V1\Seller;

use App\Http\Controllers\Controller;
use App\Models\Part;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PartController extends Controller
{
    /**
     * Display a listing of the seller's parts.
     */
    public function index(Request $request)
    {
        $seller = $request->user();
        
        $parts = Part::where('seller_id', $seller->id)
            ->with(['standardPart', 'images', 'vehicles'])
            ->paginate(15);

        return response()->json($parts);
    }

    /**
     * Store a newly created part.
     */
    public function store(Request $request)
    {
        $seller = $request->user();

        $validated = $request->validate([
            'standard_part_id' => 'required|exists:standard_parts,id',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:new,used,renewed',
            'quality' => 'required|in:original,commercial,chinese,other',
            'extra_name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'vehicle_ids' => 'nullable|array',
            'vehicle_ids.*' => 'exists:vehicles,id',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        DB::beginTransaction();
        try {
            // Create part
            $part = Part::create([
                'seller_id' => $seller->id,
                'standard_part_id' => $validated['standard_part_id'],
                'price' => $validated['price'],
                'status' => $validated['status'],
                'quality' => $validated['quality'],
                'extra_name' => $validated['extra_name'] ?? null,
                'description' => $validated['description'] ?? null,
            ]);

            // Attach vehicles
            if (isset($validated['vehicle_ids'])) {
                $part->vehicles()->attach($validated['vehicle_ids']);
            }

            // Handle image uploads
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('parts', 'public');
                    Image::create([
                        'part_id' => $part->id,
                        'image_path' => $path,
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Part created successfully',
                'data' => $part->load(['standardPart', 'images', 'vehicles'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Failed to create part',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified part.
     */
    public function show(Request $request, $id)
    {
        $seller = $request->user();
        
        $part = Part::where('seller_id', $seller->id)
            ->with(['standardPart', 'images', 'vehicles'])
            ->findOrFail($id);

        return response()->json(['data' => $part]);
    }

    /**
     * Update the specified part.
     */
    public function update(Request $request, $id)
    {
        $seller = $request->user();

        $part = Part::where('seller_id', $seller->id)->findOrFail($id);

        $validated = $request->validate([
            'price' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|in:new,used,renewed',
            'quality' => 'sometimes|in:original,commercial,chinese,other',
            'extra_name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'vehicle_ids' => 'nullable|array',
            'vehicle_ids.*' => 'exists:vehicles,id',
        ]);

        DB::beginTransaction();
        try {
            $part->update($validated);

            // Update vehicles if provided
            if (isset($validated['vehicle_ids'])) {
                $part->vehicles()->sync($validated['vehicle_ids']);
            }

            DB::commit();

            return response()->json([
                'message' => 'Part updated successfully',
                'data' => $part->load(['standardPart', 'images', 'vehicles'])
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Failed to update part',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified part.
     */
    public function destroy(Request $request, $id)
    {
        $seller = $request->user();

        $part = Part::where('seller_id', $seller->id)->findOrFail($id);

        $part->delete();

        return response()->json([
            'message' => 'Part deleted successfully'
        ]);
    }

    /**
     * Upload additional images for a part.
     */
    public function uploadImages(Request $request, $id)
    {
        $seller = $request->user();

        $part = Part::where('seller_id', $seller->id)->findOrFail($id);

        $request->validate([
            'images' => 'required|array|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $uploadedImages = [];

        foreach ($request->file('images') as $image) {
            $path = $image->store('parts', 'public');
            $img = Image::create([
                'part_id' => $part->id,
                'image_path' => $path,
            ]);
            $uploadedImages[] = $img;
        }

        return response()->json([
            'message' => 'Images uploaded successfully',
            'data' => $uploadedImages
        ], 201);
    }

    /**
     * Delete an image.
     */
    public function deleteImage(Request $request, $partId, $imageId)
    {
        $seller = $request->user();

        $part = Part::where('seller_id', $seller->id)->findOrFail($partId);
        $image = Image::where('part_id', $part->id)->findOrFail($imageId);

        // Delete file from storage
        Storage::disk('public')->delete($image->image_path);

        $image->delete();

        return response()->json([
            'message' => 'Image deleted successfully'
        ]);
    }
}
