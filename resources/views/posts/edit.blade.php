<x-layout>
    <x-slot:heading>
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Edit Post: {{ $post->title }}</h1>
    </x-slot:heading>

    <div class="max-w-4xl mx-auto bg-black shadow-md rounded-lg overflow-hidden">
        <form method="POST" action="/posts/{{$post->id}}" class="p-6">
            @csrf
            @method('PATCH')
            <div class="space-y-6">
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div class="col-span-2 sm:col-span-1">
                        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" class='text-black' name="title" id="title" autocomplete="title" value="{{$post->title}}" 
                               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required>
                        @error('title')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="col-span-2">
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" class='text-black' name="description" rows="4"
                                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  required>{{$post->description}}</textarea>
                        @error('description')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <div class="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
                    <x-button href='/posts/{{$post->id}}' class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        Cancel
                    </x-button>
                    <button type="submit" 
                            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Update
                    </button>
                </div>
            </div>
        </form>
    </div>
</x-layout>