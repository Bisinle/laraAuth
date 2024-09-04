@props(['active' =>false])



<a
    class=" {{ $active ? 'bg-gray-900 text-white ' : 'text-gray-300 hover:bg-gray-700 hover:text-white ' }}rounded-md  px-3 py-2 text-sm font-medium "
    aria-current="{{ $active ? 'page' : 'false' }}"
    {{ $attributes }}>{{$slot}}
</a>



<!-- 


@props(['active' =>false,'type'=>'button'])


@if($type==='button')

<button
    class=" {{ $active ? 'bg-yellow-900 text-white ' : 'text-yellow-300 hover:bg-yellow-700 hover:text-white ' }}rounded-md  px-3 py-2 text-sm font-medium "
    aria-current="{{ $active ? 'page' : 'false' }}"
    {{ $attributes }}>{{$slot}}
</button>

@else
<a
    class=" {{ $active ? 'bg-gray-900 text-white ' : 'text-gray-300 hover:bg-gray-700 hover:text-white ' }}rounded-md  px-3 py-2 text-sm font-medium "
    aria-current="{{ $active ? 'page' : 'false' }}"
    {{ $attributes }}>{{$slot}}
</a>

@endif -->