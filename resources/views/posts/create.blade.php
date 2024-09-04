<x-layout>

    <x-slot:heading>
        Create Job
    </x-slot:heading>


    <form method="POST" action="/posts" class="bg-gray-700 text-white">
        @csrf

        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12 ">
                <h2 class="text-base font-semibold leading-7 text-gray-300">Create New Job</h2>

                <div class="mt-10 flex flex-col justify-center items-center ">
                    <div class="sm:col-span-3">
                        <label for="programming_language" class="p-2 block text-sm font-medium leading-6 text-gray-300">Programming Language</label>
                        <div class="mt-2">
                            <select name="category" id="programming_language" class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" required>
                                @foreach($categories as $category)
                                <option value="{{ $category['name'] }}">{{ $category['name'] }}</option>
                                @endforeach


                            </select>
                        </div>
                        @error('programming_language')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                    <div class="sm:col-span-3">
                        <label for="title" class="p-2 block text-sm font-medium leading-6 text-gray-300">Title</label>
                        <div class="mt-2">
                            <input type="text" name="title" id="title" autocomplete="title" class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" required>
                        </div>
                        @error('title')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="col-span-2">
                        <label for="description" class="block text-sm font-medium text-gray-300">Description</label>
                        <textarea id="description" class="text-black" name="description" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required>
                    </textarea>
                        @error('description')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                </div>

                <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" class="text-sm font-semibold leading-6 text-gray-300">Cancel</button>
                    <button type="submit" class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
                </div>
            </div>
        </div>
    </form>

</x-layout>