<!DOCTYPE html>
<html>

<body>
<h1>KWM gegen Corana</h1>
<ul>
    @foreach($shoppinglists as $shoppinglist)
        <li><a href="shoppinglists/{{$shoppinglist->id}}">
            {{$shoppinglist->title}}</a></li>
    @endforeach
</ul>

</body>
</html>
