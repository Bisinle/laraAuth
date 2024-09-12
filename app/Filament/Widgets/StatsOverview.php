<?php

namespace App\Filament\Widgets;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Carbon\Carbon;
use Filament\Support\Enums\IconPosition;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    // protected static bool $isLazy = false;
    protected function getStats(): array
    {
        $currentUserCount = User::count();
        $lastMonthUserCount = User::where('created_at', '<', Carbon::now()->subHours())->count();
        $userGrowth = $lastMonthUserCount > 0
            ? round((($currentUserCount - $lastMonthUserCount) / $lastMonthUserCount) * 100, 1)
            : 0;
        $userTrend = $userGrowth > 0 ? 'increase' : 'decrease';
        $userDescription = abs($userGrowth) . "% {$userTrend}";

        // Find most used tag
        $mostUsedTag = Tag::withCount('posts')->orderByDesc('posts_count')->first();
        $tagDescription = $mostUsedTag
            ? "Most used: {$mostUsedTag->name} ({$mostUsedTag->posts_count} posts)"
            : 'No tags used yet';

        //most poplular cateogry
        $mostPopularCategory = Category::withCount('posts')->orderByDesc('posts_count')->first();
        // dd($mostPopularCategory);
        $catDescription = $mostPopularCategory ? "most Popular: {$mostPopularCategory->name} " : 'No categories used yet';

        return [

            // Now create the Stat instances
            Stat::make('Users', $currentUserCount)
                ->description($userDescription)
                ->descriptionIcon($userGrowth >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->color($userGrowth > 0 ? 'success' : 'danger'),

            Stat::make('Posts', Post::count())
                ->description('Total published posts')
                ->color('info')
                ->descriptionIcon('heroicon-m-document-text'),

            Stat::make('Categories', Category::count())
                ->description($catDescription)
                ->descriptionIcon('heroicon-m-rectangle-stack'),

            Stat::make('Tags', Tag::count())
                ->description($tagDescription)
                ->color('warning'),

            // Stat::make('Comparison', '')
            //     ->chart([$currentUserCount, Post::count(), Category::count(), Tag::count()])

        ];
    }
}
