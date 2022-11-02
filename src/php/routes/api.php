<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route; 
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\MasterController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\ChargesController;
use App\Http\Controllers\API\ProjectController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    //return $request->user();
//});

//echo 'fff';exit;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/sendForgetPassword', [UserController::class, 'sendForgotPassLink']);
Route::post('/resetPassword', [UserController::class, 'resetPassword']);
Route::post('/changePassword', [UserController::class, 'changePassword']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/getProfile', [UserController::class, 'getProfile']);
Route::post('/userRoles', [UserController::class, 'userRoles']);
Route::post('/addUser', [UserController::class, 'addUser']);
Route::post('/getUsers', [UserController::class, 'getUsers']);
Route::post('/updateUser', [UserController::class, 'updateUser']);
Route::post('/addRole', [UserController::class, 'addRole']);
Route::post('/getRoles', [UserController::class, 'getRoles']);
Route::post('/updateRole', [UserController::class, 'updateRole']);


Route::post('/addState', [MasterController::class, 'addState']);
Route::post('/getStates', [MasterController::class, 'getStates']);
Route::post('/updateState', [MasterController::class, 'updateState']);

Route::post('/addCity', [MasterController::class, 'addCity']);
Route::post('/getCities', [MasterController::class, 'getCities']);
Route::post('/updateCity', [MasterController::class, 'updateCity']);


Route::post('/addWard', [MasterController::class, 'addWard']);
Route::post('/getWards', [MasterController::class, 'getWards']);
Route::post('/updateWard', [MasterController::class, 'updateWard']);



Route::post('/addProjectType', [MasterController::class, 'addProjectType']);
Route::post('/getProjectTypes', [MasterController::class, 'getProjectTypes']);
Route::post('/updateProjectType', [MasterController::class, 'updateProjectType']);


Route::post('/addCustomerType', [MasterController::class, 'addCustomerType']);
Route::post('/getCustomerTypes', [MasterController::class, 'getCustomerTypes']);
Route::post('/updateCustomerType', [MasterController::class, 'updateCustomerType']);


Route::post('/addCategory', [MasterController::class, 'addCategory']);
Route::post('/getCategories', [MasterController::class, 'getCategories']);
Route::post('/updateCategory', [MasterController::class, 'updateCategory']);


Route::post('/addSubCategory', [MasterController::class, 'addSubCategory']);
Route::post('/getSubCategories', [MasterController::class, 'getSubCategories']);
Route::post('/updateSubCategory', [MasterController::class, 'updateSubCategory']);


Route::post('/addCustomer', [CustomerController::class, 'addCustomer']);
Route::post('/getCustomers', [CustomerController::class, 'getCustomers']);
Route::post('/getCustomersPag', [CustomerController::class, 'getCustomersPag']);
Route::post('/updateCustomer', [CustomerController::class, 'updateCustomer']);


Route::post('/addCharge', [ChargesController::class, 'addCharge']);
Route::post('/getCharges', [ChargesController::class, 'getCharges']);
Route::post('/updateCharge', [ChargesController::class, 'updateCharge']);
Route::post('/createChargeForCustomers', [ChargesController::class, 'createChargeForCustomers']);
Route::post('/confirmPayment', [ChargesController::class, 'confirmPayment']);
Route::post('/getCustomerAddress', [ChargesController::class, 'getCustomerAddress']);
Route::post('/getPayments', [ChargesController::class, 'getPayments']);


Route::post('/addProject', [ProjectController::class, 'addProject']);
Route::post('/getProjects', [ProjectController::class, 'getProjects']);
Route::post('/updateProject', [ProjectController::class, 'updateProject']);
Route::post('/addProjectWard', [ProjectController::class, 'addProjectWard']);
Route::post('/getWardsByProjectId', [ProjectController::class, 'getWardsByProjectId']);
Route::post('/updateProjectWard', [ProjectController::class, 'updateProjectWard']);
?>