<x-layout>
    <x-slot:heading>
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-200">posts Page</h1>
                <x-button href="/posts/create" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition duration-300 ease-in-out">
                    Create post
                </x-button>
            </div>
        </div>
    </x-slot:heading>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach ($posts as $post)
            <div class="bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out border border-gray-700">
                <div class="p-6 relative">
                    <span class="absolute top-2 right-4 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {{ $post->category->name }}
                    </span>
                    <a href="{{ route('posts.show', $post) }}" class="block">
                        <h2 class="text-xl font-semibold text-gray-200 mb-2 mt-4">{{ $post->title }}</h2>
                        <p class="text-gray-400 mb-4">{{ Str::limit($post->description, 250) }}</p>
                        <div class="flex items-center text-gray-300">
                            <span class="font-semibold text-green-400">- {{ $post->user->name }}</span>
                        </div>
                    </a>
                </div>
            </div>
            @endforeach
        </div>
        <div class="mt-8">
            {{ $posts->links() }}
        </div>
    </div>
</x-layout>