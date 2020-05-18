<!DOCTYPE html>
<html>

<body>
<h1>KWM gegen Corana</h1>
<ul>
    @foreach($shoppinglists as $shoppinglist)
        <li>{{$shoppinglist->title}}</li>
        <li>{{$shoppinglist->finalSum}}</li>
    @endforeach
</ul>

</body>
</html>
