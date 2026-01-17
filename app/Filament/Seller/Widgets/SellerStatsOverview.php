<?php

namespace App\Filament\Seller\Widgets;

use App\Models\Part;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Auth;

class SellerStatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $sellerId = Auth::guard('seller_web')->id();

        $totalParts = Part::where('seller_id', $sellerId)->count();
        $newParts = Part::where('seller_id', $sellerId)->where('status', 'new')->count();
        $usedParts = Part::where('seller_id', $sellerId)->where('status', 'used')->count();

        return [
            Stat::make('إجمالي القطع', $totalParts)
                ->description('جميع القطع المضافة')
                ->descriptionIcon('heroicon-m-wrench-screwdriver')
                ->color('success'),

            Stat::make('قطع جديدة', $newParts)
                ->description('قطع بحالة جديدة')
                ->descriptionIcon('heroicon-m-sparkles')
                ->color('info'),

            Stat::make('قطع مستعملة', $usedParts)
                ->description('قطع بحالة مستعملة')
                ->descriptionIcon('heroicon-m-arrow-path')
                ->color('warning'),
        ];
    }
}
