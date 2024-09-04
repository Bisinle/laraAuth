<x-layout>
    <x-slot:heading>
        Home Page
    </x-slot:heading>

    <!-- Hero Section -->
    <div class="relative h-screen flex items-center w-full px-0 bg-gray-900">
        <div class="absolute inset-0 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Background" class="w-full h-full object-cover opacity-20">
        </div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 class="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span class="block">Find Your Next</span>
                <span class="block text-indigo-300">Dream post</span>
            </h1>
            <p class="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Connect with top startups and companies. Discover opportunities that match your skills and aspirations.
            </p>
            <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div class="rounded-md shadow">
                    <a href="{{ route('posts.index') }}" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-indigo-300 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition duration-300">
                        Find posts
                    </a>
                </div>
                <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <a href="{{ route('posts.create') }}" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 md:py-4 md:text-lg md:px-10 transition duration-300">
                        Post a post
                    </a>
                </div>
            </div>
        </div>
        <div class="absolute bottom-5 left-1/2 transform -translate-x-1/2">
            <a href="#content" class="text-white animate-bounce">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </a>
        </div>
    </div>
    <div id="content" class="bg-gray-800">
        <!-- Featured posts Section -->
        <div class="bg-gray-700">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 class="text-3xl text-white font-extrabold tracking-tight">
                    Featured posts
                </h2>
                <div class="mt-6 grid gap-16 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
                    @foreach($featuredposts as $post)
                    <div class="bg-gray-900 shadow-md rounded-lg overflow-hidden border border-gray-600">
                        <div class="p-6">
                            <h3 class="text-lg font-semibold text-white">{{ $post->title }}</h3>
                            <p class="mt-1 text-sm font-bold text-indigo-500">{{ $post->category->name }}</p>
                            <p class="mt-3 text-sm text-gray-300">{{ $post['description'] }}</p>
                            <p class="mt-3 text-lg font-bold text-indigo-500   rounded-full px-4 py-2 inline-block transform hover:scale-105 transition-transform duration-200 shadow-lg">
                                 -{{ $post->user->name }}
                            </p>
                            <div class="mt-4">
                                <a href="{{ route('posts.show', $post) }}" class="text-sm font-medium text-indigo-300 hover:text-indigo-200">
                                    Learn More <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>

        <!-- How It Works Section -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 class="text-3xl font-extrabold tracking-tight text-white text-center">
                How It Works
            </h2>
            <div class="mt-10">
                <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                    <!-- ... (keep your existing "How It Works" content) ... -->
                </dl>
            </div>
        </div>

        <!-- Stats Section -->
        <div class="bg-gray-700">
            <div class="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
                <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
                        Trusted by users and post seekers
                    </h2>
                    <p class="mt-3 text-xl text-indigo-200 sm:mt-4">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus repellat laudantium.
                    </p>
                </div>
                <dl class="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
                    <div class="flex flex-col">
                        <dt class="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                            users
                        </dt>
                        <dd class="order-1 text-5xl font-extrabold text-white">
                            {{ $userCount }}
                        </dd>
                    </div>
                    <div class="flex flex-col mt-10 sm:mt-0">
                        <dt class="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                            Posts
                        </dt>
                        <dd class="order-1 text-5xl font-extrabold text-white">
                            {{ $postCount }}
                        </dd>
                    </div>
                    <div class="flex flex-col mt-10 sm:mt-0">
                        <dt class="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                          Categories
                        </dt>
                        <dd class="order-1 text-5xl font-extrabold text-white">
                            {{$categoryCount}}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</x-layout>