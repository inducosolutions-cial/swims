<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Models\CommonModel;
use App\Http\Controllers\Controller as Controller;
class BaseController extends Controller
{
     public function __construct(Request $request)
    {
        $data=$request->json()->all();
        if(!isset($data['corporate_code'])){
            $data=$request->all(); 
        } 
        if (isset($data['corporate_code'])) {
            CommonModel::setDBConnection($data['corporate_code']); 
        }
    }
    static public function sendResponse($result, $message)
    {
        $response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];
        return response()->json($response, 200);
    }
    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */
    static public function sendError($error, $errorMessages = [], $code = 200)
    {
        $response = [
            'success' => false,
            'code' => $code,
            'message' => $error,
        ];
        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }
        return response()->json($response, "200");
    }

    
}