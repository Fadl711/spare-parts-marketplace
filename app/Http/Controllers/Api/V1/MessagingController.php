<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessagingController extends Controller
{
    /**
     * Get all conversations for authenticated user
     */
    public function conversations(Request $request)
    {
        $user = $request->user();
        $userType = get_class($user);

        $conversations = Conversation::where(function ($q) use ($user, $userType) {
            if ($userType === 'App\Models\Customer') {
                $q->where('customer_id', $user->id);
            } elseif ($userType === 'App\Models\Seller') {
                $q->where('seller_id', $user->id);
            }
        })
        ->with(['customer', 'seller', 'messages' => function ($q) {
            $q->latest()->limit(1);
        }])
        ->latest('updated_at')
        ->paginate(20);

        $conversations->getCollection()->transform(function ($conv) use ($user, $userType) {
            $lastMessage = $conv->messages->first();
            
            return [
                'id' => $conv->id,
                'with' => $userType === 'App\Models\Customer' 
                    ? [
                        'type' => 'seller',
                        'id' => $conv->seller->id,
                        'name' => $conv->seller->store_name,
                    ]
                    : [
                        'type' => 'customer',
                        'id' => $conv->customer->id,
                        'name' => $conv->customer->name,
                    ],
                'last_message' => $lastMessage ? [
                    'content' => $lastMessage->content,
                    'sent_at' => $lastMessage->created_at->toIso8601String(),
                    'is_mine' => $this->isMessageMine($lastMessage, $user, $userType),
                ] : null,
                'updated_at' => $conv->updated_at->toIso8601String(),
            ];
        });

        return response()->json($conversations);
    }

    /**
     * Get messages in a conversation
     */
    public function messages(Request $request, $conversationId)
    {
        $user = $request->user();
        $userType = get_class($user);

        $conversation = Conversation::where(function ($q) use ($user, $userType) {
            if ($userType === 'App\Models\Customer') {
                $q->where('customer_id', $user->id);
            } elseif ($userType === 'App\Models\Seller') {
                $q->where('seller_id', $user->id);
            }
        })->findOrFail($conversationId);

        $messages = Message::where('conversation_id', $conversationId)
            ->orderBy('created_at', 'desc')
            ->paginate(50);

        $messages->getCollection()->transform(function ($msg) use ($user, $userType) {
            return [
                'id' => $msg->id,
                'content' => $msg->content,
                'is_mine' => $this->isMessageMine($msg, $user, $userType),
                'sent_at' => $msg->created_at->toIso8601String(),
            ];
        });

        return response()->json($messages);
    }

    /**
     * Send a message
     */
    public function send(Request $request)
    {
        $user = $request->user();
        $userType = get_class($user);

        $validated = $request->validate([
            'conversation_id' => 'nullable|exists:conversations,id',
            'recipient_id' => 'required_without:conversation_id|integer',
            'recipient_type' => 'required_without:conversation_id|in:customer,seller',
            'content' => 'required|string|max:1000',
        ]);

        DB::beginTransaction();
        try {
            // Find or create conversation
            if (isset($validated['conversation_id'])) {
                $conversation = Conversation::findOrFail($validated['conversation_id']);
            } else {
                $conversation = $this->findOrCreateConversation(
                    $user,
                    $userType,
                    $validated['recipient_id'],
                    $validated['recipient_type']
                );
            }

            // Create message
            $message = Message::create([
                'conversation_id' => $conversation->id,
                'sender_type' => $userType === 'App\Models\Customer' ? 'customer' : 'seller',
                'sender_id' => $user->id,
                'content' => $validated['content'],
            ]);

            // Update conversation timestamp
            $conversation->touch();

            DB::commit();

            return response()->json([
                'message' => 'Message sent',
                'data' => [
                    'id' => $message->id,
                    'conversation_id' => $conversation->id,
                    'content' => $message->content,
                    'sent_at' => $message->created_at->toIso8601String(),
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Failed to send message',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Helper: Find or create conversation
     */
    private function findOrCreateConversation($user, $userType, $recipientId, $recipientType)
    {
        if ($userType === 'App\Models\Customer' && $recipientType === 'seller') {
            $conversation = Conversation::firstOrCreate([
                'customer_id' => $user->id,
                'seller_id' => $recipientId,
            ]);
        } elseif ($userType === 'App\Models\Seller' && $recipientType === 'customer') {
            $conversation = Conversation::firstOrCreate([
                'customer_id' => $recipientId,
                'seller_id' => $user->id,
            ]);
        } else {
            throw new \Exception('Invalid recipient type');
        }

        return $conversation;
    }

    /**
     * Helper: Check if message belongs to current user
     */
    private function isMessageMine($message, $user, $userType)
    {
        $senderType = $userType === 'App\Models\Customer' ? 'customer' : 'seller';
        return $message->sender_type === $senderType && $message->sender_id === $user->id;
    }
}
