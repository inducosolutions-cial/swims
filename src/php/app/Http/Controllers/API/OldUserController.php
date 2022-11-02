<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request; 
use App\Http\Controllers\API\BaseController as BaseController;   
use App\Models\User;
use App\Models\CommonModel;  
use Hash;
use Illuminate\Support\Facades\Auth; 
use Validator;
use File;
use URL;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;


class UserController extends BaseController
{    
     
    public function sendForgotPassLink(Request $request){
      
		
		$data = $request->json()->all();
        if(!isset($data['email']) || empty($data['email']))
		{
            return $this->sendError('Email cannot be empty.',['error'=>'Email cannot be empty']);
        }
		
		$email = $request->input('email');
		
     
		$username_verify_res = User::findForEmail($email);
        if(isset($username_verify_res)){
            $data = (array)$username_verify_res;
            $data['remember_token']=time();
            User::updateUser( $data['remember_token'],$data['id']);
             // return $data;
            $role_id = $data['role_id'];
            $user_name = $data['name'];
            $first_name = ucfirst($data['name']);
			 
			
           /* $link = '<a href="http://demo.connectsocio.com/resetPassword/'.$data['remember_token'].'">
            <button style="background-color:#cccccc;color:#fff;padding:5px 15px;border-radius: 5px;" type="button" class="btn btn-info">Change Password</button></a>';*/
			
			$link =URL::to('/resetPassword/'.$data['remember_token']); 
			
            $logo = asset('assets/img/logo.png');
            $to = $email;
            $subject = 'Request for Forgot Password';

            $message = '<html><body>
                    <table style="width:75%">
                    <tr style="background-color:#8d8d8d;">
                            <th style="padding:1rem;border:1px solid #04a4d5;">
                           <h3>Cubebio</h3><img src="'.$logo.'" alt="image" width="100px" class="img-logo"></th>
                    </tr>
					
					
					
                    <tr><td style="padding:2rem 3rem;border-left:1px solid #04a4d5;border-right:1px solid #04a4d5;">';
            $message .= '<p>Dear <b>'.$first_name.'</b>,
                            <br><br>We getting forgot password request for username : <i><b>'.$user_name.'</b></i>.
                            <br>Please change your password to proceed with below link to access.
                            <br><br><span style="margin-left:200px;">'
                            .$link.
                            '</span>
                            <br><br><br>Please ignore if you not requsting to forgot password.
                            <br><br>Yours Sincerely,<br><i>Cubebio Team/i>.</p>';

            $message .= '<br></td></tr>
                    <tr style="background-color:#8d8d8d;">
                        <th style="padding:1rem;border:1px solid #04a4d5;">
                            <p style="color:#8f5137;">Copyright <i class="bx bx-copyright"></i> 2021 <a href="#" style="text-decoration:none;"> Cubebio</a>. All rights reserved</p>
                        </th>
                    </tr></table>
                </body></html>';
				
			 

            $to_email = $to; 
           
            $body_message =$message;
			 
            Mail::send([],[], function($message) use ($to_email,$body_message, $subject) {
            $message->to($to_email);
            $message->subject($subject);
			$message->setBody($body_message, 'text/html');
            $message->from("no-reply@Intersell.in","no-reply");
            }); 
			
			
			
			
           return BaseController::sendResponse($data, 'Forgot password link sent successfully to your registered email.');
          
        }else{
            return BaseController::sendError('Username not exist.', ['error'=>'Username not exist']);
        }

    }
    
    public function resetPassword(Request $request){
        $data = $request->json()->all();
        if(!isset($data['remember_token']) || empty($data['remember_token'])){
            return $this->sendError('Your remember token cannot be empty.',['error'=>'Your remember token cannot be empty']);
        }
        if(!isset($data['password']) || empty($data['password'])){
            return $this->sendError('Password cannot be empty.',['error'=>'Password cannot be empty']);
        }
		
		//$getRoleId = User::getRoleId($data);
		
        $res = User::resetPasswordSave($data);
		
		///$getRoleId = User::getRoleId($data);
        if($res)
		{
             //$response=array('role_id'=>$getRoleId->role_id);
			 $response=array();
            return BaseController::sendResponse($response, 'Your password changed successfully, Please login here.');
        }else{
            return BaseController::sendError('Your link has been expired.Please try again.', ['error'=>'Your link has been expired.Please try again.']);
        }
    }
    
    
    public function sendWelcomeEmail($user_data,$remember_token){ 
        $link = '<a href="http://demo.connectsocio.com/reset_password/'.$remember_token.'"><button style="background-color:#13bb37;color:#fff;padding:5px 15px;border-radius: 5px;" type="button" class="btn btn-info">Set Password</button></a>';
        $logo = asset('assets/img/logo.png');
        $message = '<html><body>
        <table style="width:75%">
        <tr style="background-color:#cccccc;">
                <th style="padding:1rem;border:1px solid #cbaca1;">Cubebio</th>
        </tr>
        <tr><td style="padding:2rem 3rem;border-left:1px solid #cbaca1;border-right:1px solid #cbaca1;">';
            $message .= '<p>Dear <b>'.$user_data['name'].'</b>,
                            <br><br>Welcome to Cubebio.
                            <br>Please set your password by clicking below link and get the access.
                            <br><br><span style="margin-left:200px;">'
                            .$link.
                            '</span>
                            <br><br>Yours Sincerely,<br><i>Cubebio Business Team</i>.</p>';

            $message .= '<br></td></tr>
                    <tr style="background-color:#8d8d8d;">
                        <th style="padding:1rem;border:1px solid #cbaca1;">
                            <p style="color:#8f5137;">Copyright <i class="bx bx-copyright"></i> 2020 <a href="#" style="text-decoration:none;"> Cubebio</a>. All rights reserved</p>
                        </th>
                    </tr></table>
                </body></html>';

             
            $to_email = $user_data['email'];
            $subject="Welcome to Cubebio!"; 
            $body_message =$message;
            Mail::send([],[], function($message) use ($to_email,$body_message, $subject) {
                $message->to($to_email);
                $message->subject($subject);
                $message->setBody($body_message, 'text/html');
                $message->from("no-reply@connectsocio.in", "no-reply");
            });
    
    } 

    public function changePassword(Request $request){
        $data = $request->json()->all();
        if(!isset($data['user_id']) || empty($data['user_id'])){
            return $this->sendError('UserModel id cannot be empty.',['error'=>'UserModel id cannot be empty']);
        }
        if(!isset($data['old_password']) || empty($data['old_password'])){
            return $this->sendError('Old Password cannot be empty.',['error'=>'Old Password cannot be empty']);
        }
        if(!isset($data['password']) || empty($data['password'])){
            return $this->sendError('Password cannot be empty.',['error'=>'Password cannot be empty.']);
        }
		
		 
         
        $data = $request->json()->all();
        if(Auth::attempt(['id' => $data['user_id'], 'password' => $data['old_password']]) ){
            $res = User::changePasswordSave($data);
            if($res){
                return $this->sendResponse($res, 'Your password changed successfully.');
            }else{
                return $this->sendError('Password not changed.', ['error'=>'Password not changed, Please try again']);
            }
        }
        return $this->sendError('Not authorized for change password.', ['error'=>'Not authorized for change password, Please try again']);
    } 

  public function getProfile(Request $request)
  {
    $data = $request->json()->all();
        if(!isset($data['user_id']) || empty($data['user_id'])){
            return $this->sendError('UserId cannot be empty.',['error'=>'UserId cannot be empty']);
        }
        else
        {
            $user_id = $data['user_id'];
            $profile_data = User::getProfileData($user_id);
            $users_data = [];
			foreach($profile_data as $key=>$val)
			{
			$getStateName =  User::getStateName($val->state_id);
			$getCityName =  User::getCityName($val->city_id);
			$getWardName =  User::getWardName($val->ward_id);
			$getProjectName =  User::getProjectName($val->project_id);
			$getCategoryName =  User::getCategoryName($val->category_id);
			$getSubCategoryName =  User::getSubCategoryName($val->sub_category_id);
			$getCustomerTypeName =  User::getCustomerTypeName($val->customer_type);
			$getRoleName = User::getRoleName($val->role_id);
			
			if(!empty($getProjectName->project_name)) 
			{ 
		    $projectname = $getProjectName->project_name; 
		    } 
			else  
			{ 
		    $projectname = ""; 
			}
			
			if(!empty($getStateName->state_name)) 
			{ 
		    $state_name = $getStateName->state_name; 
		    } 
			else  
			{ 
		    $state_name = ""; 
			}
			
			if(!empty($getCityName->city_name)) 
			{ 
		    $city_name = $getCityName->city_name; 
		    } 
			else  
			{ 
		    $city_name = ""; 
			}
			
			if(!empty($getWardName->ward_name)) 
			{ 
		    $ward_name = $getWardName->ward_name; 
		    } 
			else  
			{ 
		    $ward_name = ""; 
			}
			
			if(!empty($getCategoryName->category_name)) 
			{ 
		    $category_name = $getCategoryName->category_name; 
		    } 
			else  
			{ 
		    $category_name = ""; 
			}
			
			if(!empty($getSubCategoryName->sub_category_name)) 
			{ 
		    $sub_category_name = $getSubCategoryName->sub_category_name; 
		    } 
			else  
			{ 
		    $sub_category_name = ""; 
			}
			
			if(!empty($getCustomerTypeName->customer_type)) 
			{ 
		    $customer_type = $getCustomerTypeName->customer_type; 
		    } 
			else  
			{ 
		    $customer_type = ""; 
			}
			
			
			if(!empty($getRoleName->role_name)) 
			{ 
		    $role_name = $getRoleName->role_name; 
		    } 
			else  
			{ 
		    $role_name = ""; 
			}
			
			$data['user_id']=$val->user_id;
			$data['role_id'] = $val->role_id;
			$data['role_name'] = $role_name;
			$data['name']=$val->name;
			$data['email']=$val->email;
			$data['mobile']=$val->mobile;
			$data['house_no']=$val->house_no;
			$data['state_id']=$val->state_id;
			$data['state_name'] = $state_name;
			$data['city_id']=$val->city_id;
			$data['city_name'] = $city_name;
			$data['ward_id']=$val->ward_id;
			$data['ward_name'] = $ward_name;
			$data['project_id']=$val->project_id;
			$data['project_name'] = $projectname;
			$data['address']=$val->address;
			$data['locality']=$val->locality;
			$data['postalcode']=$val->postalcode;
			$data['unit']=$val->unit;
			$data['customer_type']=$val->customer_type;
			$data['customer_type_name']=$customer_type;
			$data['category_id']=$val->category_id;
			$data['category_name'] = $category_name;
			$data['sub_category_id']=$val->sub_category_id;
			$data['sub_category_name'] = $sub_category_name;
			 
			 array_push($users_data,$data);
		}
            if(!empty($users_data))
            {
                return BaseController::sendResponse($users_data, 'UserModel Details Found.');
            }
            else
            {
                return BaseController::sendError('UserId doesnot exist.', ['error'=>'UserId doesnot exist']);
            }
        }
  }

    public function updateProfile(Request $request)
    {
            $data = $request->json()->all();
            if(!isset($data['user_id']) || empty($data['user_id'])){
                return $this->sendError('Userid cannot be empty.',['error'=>'UserId cannot be empty']);
            }
            else
            {
                 
                $checkuser_id = User::checkuserId($data['user_id']);
                if(!empty($checkuser_id))
                {
                    $updateDetails = User::updateUserprofile($data);

                    $updateusertabledata = User::updateusertabledata($data);
                    //print_r($updateDetails);exit;
                    /*if($updateDetails)
                    {
                    return BaseController::sendResponse($data1['user_id'], 'UserModel Profile Updated Successfully.');
                    }
                    else
                    {
                    return BaseController::sendError('UserModel Profile Not Updated.', ['error'=>'UserModel Profile Not Updated']);
                    }*/

                    return BaseController::sendResponse($data['user_id'], 'User Profile Updated Successfully.');

                }
                else
                {
                    return BaseController::sendError('UserId doesnot exist.', ['error'=>'UserId doesnot exist']);
                }
            }
            
    }

    public function userRoles(Request $request)
	{
		$data = $request->json()->all();
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
                return $this->sendError('Userid cannot be empty.',['error'=>'UserId cannot be empty']);
        }
		
		$getRoles = User::getRoles();
		return BaseController::sendResponse($getRoles, 'Data Found.');
		
	}
	
	public function addUser(Request $request)
	{
		$data = $request->json()->all();
		if(!isset($data['created_by']) || empty($data['created_by']))
		{
                return $this->sendError('Creater by cannot be empty.',['error'=>'Creater by cannot be empty']);
        }
		
		$checkEmailExists = User::checkEmailExists($data['email']);
		 if(!empty($checkEmailExists->email))
		 {
			 return $this->sendError('Email Already Exists.',['error'=>'Email Already Exists']);
		 }
		 
		 $checkMobileExists = User::checkMobileExists($data['mobile']);
		 if(!empty($checkMobileExists->mobile))
		 {
			 return $this->sendError('Mobile Already Exists.',['error'=>'Mobile Already Exists']);
		 }
		 
		 if(!empty($data['house_no']))
		{
		 $checkHouseNoExists = User::checkHouseNoExists($data['house_no']);
		 if(!empty($checkHouseNoExists->house_no))
		 {
			 return $this->sendError('House No Already Exists.',['error'=>'House No Already Exists']);
		 }
		}
		 
		 $params = array(
		 'name'=>$data['name'],
		 'email'=>$data['email'],
		 'username'=>$data['email'],
		 'mobile'=>$data['mobile'],
		 'role_id'=>$data['role_id'],
		  );
		 $userstable = User::addUsers($params);
		 
		 $data['user_id'] = $userstable;
		  
		 
		 $result = User::addUsersDetails($data);
		 
		 if($result)
		 {
             $response=array();
            return BaseController::sendResponse($response, 'User Added Successfully.');
         }
		 else
		 {
            return BaseController::sendError('User Not Added,Something Went Wrong.', ['error'=>'User Not Added,Something Went Wrong.']);
		 
	     }
		 
		 
		
	}
	
	
	public function getUsers(Request $request)
	{
		$data = $request->json()->all();
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
                return $this->sendError('Userid cannot be empty.',['error'=>'UserId cannot be empty']);
        }
		$getUsers = User::getUsersData();
		 
		 $users_data = [];
		foreach($getUsers as $key=>$val)
		{
			$getStateName =  User::getStateName($val->state_id);
			$getCityName =  User::getCityName($val->city_id);
			$getWardName =  User::getProjectWardName($val->project_ward_id);
			$getProjectName =  User::getProjectName($val->project_id);
			$getCategoryName =  User::getCategoryName($val->category_id);
			$getSubCategoryName =  User::getSubCategoryName($val->sub_category_id);
			$getCustomerTypeName =  User::getCustomerTypeName($val->customer_type);
			$getRoleName = User::getRoleName($val->role_id);
			
			if(!empty($getProjectName->project_name)) 
			{ 
		    $projectname = $getProjectName->project_name; 
		    } 
			else  
			{ 
		    $projectname = ""; 
			}
			
			if(!empty($getStateName->state_name)) 
			{ 
		    $state_name = $getStateName->state_name; 
		    } 
			else  
			{ 
		    $state_name = ""; 
			}
			
			if(!empty($getCityName->city_name)) 
			{ 
		    $city_name = $getCityName->city_name; 
		    } 
			else  
			{ 
		    $city_name = ""; 
			}
			
			if(!empty($getWardName->ward_name)) 
			{ 
		    $ward_name = $getWardName->ward_name; 
		    } 
			else  
			{ 
		    $ward_name = ""; 
			}
			
			if(!empty($getCategoryName->category_name)) 
			{ 
		    $category_name = $getCategoryName->category_name; 
		    } 
			else  
			{ 
		    $category_name = ""; 
			}
			
			if(!empty($getSubCategoryName->sub_category_name)) 
			{ 
		    $sub_category_name = $getSubCategoryName->sub_category_name; 
		    } 
			else  
			{ 
		    $sub_category_name = ""; 
			}
			
			if(!empty($getCustomerTypeName->customer_type)) 
			{ 
		    $customer_type = $getCustomerTypeName->customer_type; 
		    } 
			else  
			{ 
		    $customer_type = ""; 
			}
			
			
			/*if(!empty($getRoleName->role_name)) 
			{ 
		    $role_name = $getRoleName->role_name ?? ''; 
		    } 
			else  
			{ 
		    $role_name = ""; 
			}
			*/
			
			$role_name = $getRoleName->role_name ?? ''; 
			
			$data['user_id']=$val->user_id;
			$data['role_id'] = $val->role_id;
			$data['role_name'] = $role_name;
			$data['name']=$val->name;
			$data['email']=$val->email;
			$data['mobile']=$val->mobile;
			$data['house_no']=$val->house_no;
			$data['state_id']=$val->state_id;
			$data['state_name'] = $state_name;
			$data['city_id']=$val->city_id;
			$data['city_name'] = $city_name;
			$data['project_ward_id']=$val->project_ward_id;
			$data['ward_name'] = $ward_name;
			$data['project_id']=$val->project_id;
			$data['project_name'] = $projectname;
			$data['address']=$val->address;
			$data['locality']=$val->locality;
			$data['postalcode']=$val->postalcode;
			$data['unit']=$val->unit;
			$data['customer_type']=$val->customer_type;
			$data['customer_type_name']=$customer_type;
			$data['category_id']=$val->category_id;
			$data['category_name'] = $category_name;
			$data['sub_category_id']=$val->sub_category_id;
			$data['sub_category_name'] = $sub_category_name;
			 
			 array_push($users_data,$data);
			
			 
		}
		return BaseController::sendResponse($users_data, 'Users Data Found.');
		
	}
	
	
	public function updateUser(Request $request)
	{
		$data = $request->json()->all();
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
                return $this->sendError('Userid cannot be empty.',['error'=>'UserId cannot be empty']);
        }
		
		$checkEmailExists = User::checkEmailExistsByUser($data['email'],$data['user_id']);
		 if(!empty($checkEmailExists->email))
		 {
			 return $this->sendError('Email Already Exists.',['error'=>'Email Already Exists']);
		 }
		 
		 $checkMobileExists = User::checkMobileExistsByUser($data['mobile'],$data['user_id']);
		 if(!empty($checkMobileExists->mobile))
		 {
			 return $this->sendError('Mobile Already Exists.',['error'=>'Mobile Already Exists']);
		 }
		 
		 if(!empty($data['house_no']))
		{
		 $checkHouseNoExists = User::checkHouseNoExistsByUser($data['house_no'],$data['user_id']);
		 if(!empty($checkHouseNoExists->house_no))
		 {
			 return $this->sendError('House No Already Exists.',['error'=>'House No Already Exists']);
		 }
		}
		 
		 $params = array(
		 'name'=>$data['name'],
		 'email'=>$data['email'],
		 'username'=>$data['email'],
		 'mobile'=>$data['mobile'],
		 'role_id'=>$data['role_id'],
		  );
		 $userstable = User::updateUsers($params,$data['user_id']);
		 
		  
		  
		 
		 $result = User::updateUsersDetails($data,$data['user_id']);
		 //echo $result;exit;
		 if($result)
		 {
             $response=array();
            return BaseController::sendResponse($response, 'User Updated Successfully.');
         }
		 else
		 {
            return BaseController::sendError('User Not Updated,Something Went Wrong.', ['error'=>'User Not Updated,Something Went Wrong.']);
	     }
		 
		 
		
	}
	
	
	public function addRole(Request $request)
	{
		$data = $request->json()->all();
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
                return $this->sendError('Userid cannot be empty.',['error'=>'UserId cannot be empty']);
        }
		$params = array('created_by'=>$data['user_id'],'role_name'=>$data['role_name']);
		 $result = User::addRole($params);
		 if($result)
		 {
             $response=array();
            return BaseController::sendResponse($response, 'Role Added Successfully.');
         }
		 else
		 {
            return BaseController::sendError('Role Not Added,Something Went Wrong.', ['error'=>'Role Not Added,Something Went Wrong.']);
		 
	     }
		 
		 
		
	}
	
	
	
	public function getRoles(Request $request)
	{
		$data = $request->json()->all();
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
                return $this->sendError('Userid cannot be empty.',['error'=>'UserId cannot be empty']);
        }
		 
		 $result = User::getRolez();
		 if($result)
		 {
             $response=array();
            return BaseController::sendResponse($result, 'Roles Data Found.');
         }
		 else
		 {
            return BaseController::sendError('Data Not Found,Something Went Wrong.', ['error'=>'Data Not Found,Something Went Wrong.']);
		 
	     }
		 
		 
		
	}
	
	
	public function updateRole(Request $request)
	{
		$data = $request->json()->all();
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
                return $this->sendError('Userid cannot be empty.',['error'=>'UserId cannot be empty']);
        }
		
		
		if(!isset($data['role_id']) || empty($data['role_id']))
		{
                return $this->sendError('Role id cannot be empty.',['error'=>'Role id cannot be empty']);
        }
		 
		 $result = User::updateRole($data);
		 if($result)
		 {
             $response=array();
            return BaseController::sendResponse($response, 'Role Updated Successfully.');
         }
		 else
		 {
            return BaseController::sendError('Role Not Updated,Something Went Wrong.', ['error'=>'Role Not Updated,Something Went Wrong.']);
		 
	     } 
		
	}

}
?>