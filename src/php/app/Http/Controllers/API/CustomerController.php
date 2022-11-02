<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request; 
use App\Http\Controllers\API\BaseController as BaseController;   
use App\Models\CustomerModel;  
use Hash;
use Illuminate\Support\Facades\Auth; 
use Validator;
use File;
use URL;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;


class CustomerController extends BaseController
{    

public function addCustomer(Request $request)
{
	$data = $request->json()->all();
		 
		 if(!isset($data['created_by']) || empty($data['created_by']))
		 {
            return $this->sendError('Created by cannot be empty.',['error'=>'Created by cannot be empty']);
         }
		 
		 
		/* $checkEmailExists = CustomerModel::checkEmailExists($data['email']);
		 if(!empty($checkEmailExists->email))
		 {
			 return $this->sendError('Email Already Exists.',['error'=>'Email Already Exists']);
		 }
		 
		 $checkHouseNoExists = CustomerModel::checkHouseNoExists($data['house_no']);
		 if(!empty($checkHouseNoExists->house_no))
		 {
			 return $this->sendError('House No Already Exists.',['error'=>'House No Already Exists']);
		 }*/
		 
		 
		 
		 
		 
		 $checkMobileExists = CustomerModel::checkMobileExists($data['mobile']);
		 if(!empty($checkMobileExists->mobile))
		 {
			 //return $this->sendError('Mobile Already Exists.',['error'=>'Mobile Already Exists']);
			 $data['user_id'] = $checkMobileExists->id;
			 
		 }
		 else
		 {
		
		      $params = array('name'=>$data['name'],'email'=>$data['email'],'username'=>$data['email'],'mobile'=>$data['mobile'],'role_id'=>3);
		      $userstable = CustomerModel::addCustomer($params);
		      $data['user_id'] = $userstable;	
             			  
		 }
		 
		 ////sometimes customers can be added by admin so to know who created customers we are using supervisor_id
		 ////and if  $data['supervisor_id'] not empty then customer was created by admin and assigned supervisor to supervisor_id
		 ////if  $data['supervisor_id'] is empty then customer is created by supervisor,
		 ///if  $data['supervisor_id'] not empty then customer is created by admin
		             if($data['supervisor_id'] == "")
					 {
						 $data['supervisor_id'] = $data['created_by'];
					 }
					 else
					 {
						 $data['supervisor_id'] = $data['supervisor_id']; 
					 }
					 
					 $getProjectAndWardBySupervisorId = CustomerModel::getProjectAndWardBySupervisorId($data['supervisor_id']);
					 
					 $data['project_id'] = $getProjectAndWardBySupervisorId->project_id;
					 $data['project_ward_id'] = $getProjectAndWardBySupervisorId->project_ward_id;
					 
		  $data['role_id'] = 3;
		  $result = CustomerModel::addCustomerDetails($data);
		 
		 if($result)
		 {
             $response=array();
            return BaseController::sendResponse($response, 'Customer Added Successfully.');
         }
		 else
		 {
            return BaseController::sendError('Customer Not Added,Something Went Wrong.', ['error'=>'Customer Not Added,Something Went Wrong.']);
		 
	     }
	
	
}


public function getCustomers(Request $request)
	{
		$data = $request->json()->all();
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
                return $this->sendError('Userid cannot be empty.',['error'=>'UserId cannot be empty']);
        }
		$getCustomersData = CustomerModel::getCustomersData($data);
		 
		  
		foreach($getCustomersData as $key=>$val)
		{
			$getStateName =  CustomerModel::getStateName($val->state_id);
			$getCityName =  CustomerModel::getCityName($val->city_id);
			$getWardName =  CustomerModel::getWardName($val->project_ward_id);
			$getProjectName =  CustomerModel::getProjectName($val->project_id);
			$getCategoryName =  CustomerModel::getCategoryName($val->category_id);
			$getSubCategoryName =  CustomerModel::getSubCategoryName($val->sub_category_id);
			$getCustomerTypeName =  CustomerModel::getCustomerTypeName($val->customer_type);
			$getRoleName = CustomerModel::getRoleName($val->role_id);
			$getSupervisorName = CustomerModel::getSupervisorName($val->supervisor_id);
			
			
			$getBillingAmount = CustomerModel::getBillingAmount($val->id);
		    $getPaymentAmount = CustomerModel::getPaymentAmount($val->id);
			 
			
			$getCustomersData[$key]->supervisor_name = $getSupervisorName->name ?? '';
			$getCustomersData[$key]->role_name = $getRoleName->role_name ?? '';
			$getCustomersData[$key]->state_name = $getStateName->state_name ?? '';
			$getCustomersData[$key]->city_name = $getCityName->city_name ?? '';
			$getCustomersData[$key]->ward_name = $getWardName->ward_name ?? '';
			$getCustomersData[$key]->project_name = $getProjectName->project_name ?? '';
			$getCustomersData[$key]->customer_type_name=$getCustomerTypeName->customer_type ?? '';
			$getCustomersData[$key]->category_name = $getCategoryName->category_name ?? '';
			$getCustomersData[$key]->sub_category_name = $getSubCategoryName->sub_category_name ?? '';
			$getCustomersData[$key]->pending_amount = $getBillingAmount-$getPaymentAmount;
			 
			
			 
		}
		return BaseController::sendResponse($getCustomersData, 'Customers Data Found.');
		
	}
	
	
	public function updateCustomer(Request $request)
{
	$data = $request->json()->all();
		 
		 if(!isset($data['user_id']) || empty($data['user_id']))
		{
          return $this->sendError('Userid cannot be empty.',['error'=>'UserId cannot be empty']);
        }
	  
		 $customer_id = $data['customer_id'];
		 $params = array(
		 'name'=>$data['name'],
		 'email'=>$data['email'],
		 'username'=>$data['email'],
		 'mobile'=>$data['mobile'],
		 
		  );
		  
		  ///$customerid is auto id in user_details table so we need user_id from that id to update in users table for that we wrote below function getUserId
		  
		  
		$getUserId = CustomerModel::getUserId($customer_id);  
		$userstable = CustomerModel::updateCustomer($params,$getUserId->user_id);
		 
		 
        //here we have multiple rows with same user_id i.e, that a customer has multiple houses, we are updating each single row using user_details autoid 
        // so if name,email,mobile updates in any single row,that three fields has to update in all same user_id's 		
		
		$threeparamstoupdate = array('name'=>$data['name'],'email'=>$data['email'],'mobile'=>$data['mobile']);
		$updateOnlyThreeInAllUserIds = CustomerModel::updateOnlyThreeInAllUserIds($threeparamstoupdate,$getUserId->user_id);
		
		
		$getProjectAndWardBySupervisorId = CustomerModel::getProjectAndWardBySupervisorId($data['supervisor_id']);
		$data['project_id'] = $getProjectAndWardBySupervisorId->project_id;
		$data['project_ward_id'] = $getProjectAndWardBySupervisorId->project_ward_id;
		 
		 $result = CustomerModel::updateCustomerDetails($data,$customer_id);
		 
		 
		 
		  $response=array();
          return BaseController::sendResponse($response, 'Customer Updated Successfully.');
	
	
}

public function getCustomersPag(Request $request)
    { 
        $data = $request->json()->all();
        if (!isset($data['user_id']) || empty($data['user_id'])) 
		{
            return $this->sendError('User id cannot be empty.', ['error'=>'User id cannot be empty']);
        } 
         
        $ordersList=array();
        $page =$data['page_no'];
        $perPage =$data['no_of_records'];
        $offset = ($page * $perPage) - $perPage; 
        $ordersList['records']=CustomerModel::getCustomersPag($data,$offset,$perPage); 
        $ordersList['count']=CustomerModel::getCustomersPagCount($data);
		$orders_count=CustomerModel::getCustomersPagCount($data);
        $ordersList['no_of_records']=ceil($orders_count/$perPage);
        
        return BaseController::sendResponse($ordersList, "Orders list");
    }

}
?>