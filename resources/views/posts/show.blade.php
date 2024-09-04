<x-layout>
    <x-slot:heading>
        post Detail
    </x-slot:heading>

    <div class="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="px-6 py-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ $post['title'] }}</h1>

            <div class="bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out border border-gray-700">
                <div class="p-6 relative">
                    <span class="absolute top-2 right-4 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {{ $post->category->name }}
                    </span>
                   
                        <h2 class="text-xl font-semibold text-gray-200 mb-2 mt-4">{{ $post['title'] }}</h2>
                        <p class="text-gray-400 mb-4">{{ $post['description'] }}</p>
                        <div class="flex items-center text-gray-300">
                           
                            <span class="font-semibold text-green-400">- {{ $post->user->name }}</span>
                        </div>
                    
                </div>
            </div>

            <!-- Add more post details here if needed -->

            <div class="mt-8 flex justify-between ">
                <x-button>
                    Apply post
                </x-button>
                <div class="flex gap-2 justify-center items-center">
                    <a href='/posts/{{$post->id}}/edit' class="cursor-pointer">
                        <x-feathericon-edit class="w-6 h-6 text-blue-500 hover:text-blue-700" />
                    </a>
                    <button form="delete-form">

                        <x-monoicon-delete  class="text-red-400 w-6 h-6 cursor-pointer" />
                    </button>





                </div>


            </div>
        </div>
    </div>
    <form method="POST" action='/posts/{{ $post->id }}' id="delete-form">
        @csrf
        @method('DELETE')
    </form>
</x-layout>