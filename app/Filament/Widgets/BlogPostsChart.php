<?php

// namespace App\Filament\Widgets;

// use App\Models\Category;
// use App\Models\Tag;
// use App\Models\User;
// use App\Models\Post;
// use Filament\Widgets\ChartWidget;

// class BlogPostsChart extends ChartWidget
// {


//     protected static ?string $heading = 'BarChart';
//     protected static ?string $description = 'Data Comparison';
//     protected static string $color = 'danger';
//     public function getColumnSpan(): int | string | array
//     {
//         return 'full';
//     }

//     protected function getData(): array
//     {
//         $posts = Post::count();
//         $users = User::count();
//         $categories = Category::count();
//         $tags = Tag::count();
//         return [
//             // 'datasets' => [
//             //     [
//             //         'label' => 'Blog info',
//             //         'data' => [
//             //             $posts,
//             //             $users,
//             //             $categories,
//             //             $tags
//             //         ],
//             //         'backgroundColor' => [
//             //             'rgba(255, 99, 132, 0.6)',
//             //             'rgba(54, 162, 235, 0.6)',
//             //             'rgba(255, 206, 86, 0.6)',
//             //             'rgba(75, 192, 192, 0.6)',
//             //         ],
//             //         'borderColor' => [
//             //             'rgba(255, 99, 132, 1)',
//             //             'rgba(54, 162, 235, 1)',
//             //             'rgba(255, 206, 86, 1)',
//             //             'rgba(75, 192, 192, 1)',
//             //         ],
//             //         'borderWidth' => 1,
//             //     ],
//             // ],
//             // 'labels' => ['Posts', 'Users', 'Cate', 'Tags'],
//         ];
//     }

//     protected function getType(): string
//     {
//         return '';
//     }
//     protected function getOptions(): array
//     {
//         return [
//             // 'scales' => [
//             //     'y' => [
//             //         'beginAtZero' => true,
//             //         'ticks' => [
//             //             'stepSize' => 0.5,
//             //         ],
//             //     ],
//             // ],
//             // 'plugins' => [
//             //     'legend' => [
//             //         'display' => true,
//             //     ],
//             // ],
//             // 'maintainAspectRatio' => false,
//             // 'aspectRatio' => 2,
//         ];
//     }
// }
