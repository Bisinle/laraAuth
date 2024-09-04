<!-- resources/views/components/search.blade.php -->
<form method="GET" action="{{ route('search') }}" class="flex items-center space-x-4">
    <input
        type="text"
        name="search_term"
        id="search_term"
        class="px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="Search..."
        value="{{ request('search_term') }}"
    >
    <select name="category_id" class="px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        <option value="">All Categories</option>
        @foreach ($categories as $category)
        <option value="{{ $category->id }}" {{ request('category_id') == $category->id ? 'selected' : '' }}>
            {{ $category->name }}
        </option>
        @endforeach
    </select>
    <select name="user_id" class="px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        <option value="">All Users</option>
        @foreach ($users as $user)
        <option value="{{ $user->id }}" {{ request('user_id') == $user->id ? 'selected' : '' }}>
            {{ $user->name }}
        </option>
        @endforeach
    </select>
    <button
        type="submit"
        class="px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
        Search
    </button>
</form>