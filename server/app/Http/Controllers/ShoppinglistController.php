<?php

namespace App\Http\Controllers;

use App\Shoppinglist;
use App\Shoppingitem;
use App\User;
use http\Env\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Psy\Util\Json;
use function foo\func;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests;
use JWTAuth;
use JWTAuthException;
use PhpParser\Error;


class ShoppinglistController extends Controller
{
    public function index() {
        //return response()->json('here', 201);
        // load all lists and relations with edger loading wich means "load all related objects
        $shoppinglists = Shoppinglist::with(['user', 'shoppingitems'])->get();
        return $shoppinglists;
    }


    public function getSingle(int $id): Shoppinglist
    {

    $list = Shoppinglist::where('id', $id)->with(['user', 'shoppingitems'])->first();
    //var_dump($list); die();
    return $list;
        }

    public function show ($shoppinglist){
        $shoppinglist = Shoppinglist::find($shoppinglist);
        return view('shoppinglists.show', compact('shoppinglist'));
    }


    public function save (Request $request) {
        //return response()->json('here', 201);
        $request = $this->parseRequest($request);
        DB::beginTransaction();
        try {
            $shoppinglist = Shoppinglist::create($request->all());


            //save shoppingitems
            if (isset($request['shoppingitems']) && is_array($request['shoppingitems'])) {
                foreach ($request['shoppingitems'] as $item) {

                    $shoppingitem = Shoppingitem::firstOrNew([
                        'name'=> $item['name'],
                        'amount'=> $item['amount'],
                        'maxPrice'=> $item['maxPrice'],
                    ]);

                    $shoppinglist->shoppingitems()->save($shoppingitem);

                   /* $shoppingitem1 = new Shoppingitem;
                    $shoppingitem1->name = $item['name'];
                    $shoppingitem1->amount = $item['amount'];
                    $shoppingitem1->maxPrice = $item['maxPrice'];
                    /*
                    $it = App\Shoppingitem::firstOrNew([
                        'name' => $item['name'],
                        'amount' => $item['amount'],
                        'maxPrice' => $item['maxPrice'],
                        'shoppinglist_id' => $shoppinglist->id
                    ]);

                    /*
                    $shoppingitem = new Shoppingitem;

                    $shoppingitem->name = $item['name'];
                    $shoppingitem->amount = $item['amount'];
                    $shoppingitem->maxPrice = $item['maxPrice'];


                    $shoppinglist->shoppingitems()->save($shoppingitem1);

*/
                }
            }

            //save user
            if (isset($request['users']) && is_array($request['users'])) {
                foreach ($request['users'] as $usr) {
                    $user = User::firstOrNew([
                        'firstName' => $usr['firstName'],
                        'lastName' => $usr['lastName'],
                    ]);
                    $shoppinglist->users()->save($user);
                }
            }

            //save comment
            if (isset($request['comments']) && is_array($request['comments'])) {
                foreach ($request['comments'] as $com) {
                    $comment = Comment::firstOrNew([
                        'text' => $com['text'],
                    ]);
                    $shoppinglist->comments()->save($comment);
                }
            }

            DB::commit();

            return response()->json($shoppinglist, 201);
        }
        catch (\Exception $e) {
            DB::rollback();
            return response()->json("saving shoppinglist failed: " . $e->getMessage(), 420);
        }
    }

    public function update(Request $request, int $id) {
        DB::beginTransaction();
        try {
            $shoppinglist = Shoppinglist::with(['user', 'shoppingitems'])
                ->where('id', $id)->first();
            if($shoppinglist != null){
                $request = $this->parseRequest( $request );
                $shoppinglist->update($request->all());

                //$shoppinglist->shoppingitems()->delete();
                //$shoppinglist->shoppinglist()->delete();

                if(isset($request['shoppingitems']) && is_array($request['shoppingitems']) ){
                    foreach ($request['shoppingitems'] as $item){
                        $shoppingitems = Shoppingitem::firstOrNew(['name' => $item['name'],
                            'amount' => $item['amount'], 'maxPrice' => $item['maxPrice'] ]);
                        $shoppinglist->shoppingitems()->save($shoppingitems);
                    }
                }
                $shoppinglist->save();
            }
            DB::commit();
            $shoppinglist1 = Shoppinglist::with(['user', 'shoppingitems'])
                ->where('id', $id)->first();
            return response()->json($shoppinglist1 ,201);
        }
        catch (\Exception $e){
            DB::rollBack();
            return response()->json("updating list failed: " . $e->getMessage(), 420);
        }
    }

    public function delete (string $id) : JsonResponse
    {
        $shoppinglist = Shoppinglist::where('id', $id)->first();
        if ($shoppinglist != null ) {
            $shoppinglist -> delete ();
        }
        else
            throw new \Exception ("shoppinglist couldn't be deleted - it does not exist");
        return response()->json( 'shoppinglist ('.$id.') successfully deleted' ,200);

    }

    private function parseRequest(Request $request)
    {
        $date = new \DateTime($request->published);
        $request['dueDate'] = $date;
        return $request;
    }
}
