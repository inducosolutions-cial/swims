<?php

namespace App\Http\Controllers\API;
use Illuminate\Http\Request; 
use App\Http\Controllers\API\BaseController as BaseController;   
use App\Models\User;
use App\Models\ChargesModel; 
use App\Models\CustomerModel; 
use Hash;
use Illuminate\Support\Facades\Auth; 
use Validator;
use File;
use URL;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;


class ChargesController extends BaseController
{    

public function addCharge(Request $request)
{
	    $data = $request->json()->all();
		$res = ChargesModel::checkChargesExists($data);
		if(!empty($res->charges_id))
        {
		return $this->sendError('Charge already exists.',['error'=>'Charge already exists.']);
		}
        $result = ChargesModel::addCharges($data);
		if($result)
		{
            $response=array();
            return BaseController::sendResponse($response, 'Charges Added Successfully.');
        }
		else
		{
            return BaseController::sendError('Charges Not Added,Something Went Wrong.', ['error'=>'Charges Not Added,Something Went Wrong.']);
	    }
	
	
}

public function getCharges(Request $request)
	{
		$data = $request->json()->all();
		 
		
		  
		$getCharges = ChargesModel::getCharges($data);
		foreach($getCharges as $key=>$val)
		{
		   
			$getProjectName =  ChargesModel::getProjectName($val->project_id);
			$getCategoryName =  ChargesModel::getCategoryName($val->category_id);
			$getSubCategoryName =  ChargesModel::getSubCategoryName($val->sub_category_id);
			$getCustomerTypeName =  ChargesModel::getCustomerTypeName($val->customer_type);
			
			$getCharges[$key]->customer_type_name = $getCustomerTypeName->customer_type ?? '';
			$getCharges[$key]->category_name = $getCategoryName->category_name ?? ''; 
			$getCharges[$key]->sub_category_name = $getSubCategoryName->sub_category_name ?? '';
			$getCharges[$key]->project_name = $getProjectName->project_name ?? ''; 
			 
			 
			//array_push($users_data,$data);
		}
		return BaseController::sendResponse($getCharges, 'Charges Data Found.');
		
	}


public function updateCharge(Request $request)
{
	
	     $data = $request->json()->all();
		 
		 $res = ChargesModel::checkChargesExists($data);
		 if(!empty($res->charges_id))
         {
		 return $this->sendError('Charge already exists.',['error'=>'Charge already exists.']);
		 }
         $charges_id = $data['charges_id'];
   
		 $result = ChargesModel::updateCharges($data,$charges_id);
		 
		 
		if($result)
		{
            $response=array();
            return BaseController::sendResponse($response, 'Charges Updated Successfully.');
        }
		else
		{
           return BaseController::sendError('Charges Not Updated,Something Went Wrong.', ['error'=>'Charges Not Updated,Something Went Wrong.']);
		 
	    }
	
}

public function createChargeForCustomers(Request $request)
{
	
	    $getCustomers = ChargesModel::getCustomers();
		 
		foreach($getCustomers as $key=>$val)
		{
			
			$parameters = array('project_id'=>$val->project_id,'customer_type'=>$val->customer_type,'category_id'=>$val->category_id,'sub_category_id'=>$val->sub_category_id);
			$getAmount = ChargesModel::getAmount($parameters);
			$amount_to_be_added = $getAmount->charges ?? '';
			
			//if(!empty($getAmount))
			//{
			//$billingparams = array('supervisor_id'=>$val->supervisor_id,'customer_id'=>$val->user_id,'house_no'=>$val->house_no,'customer_address'=>$val->address,'amount'=>$amount_to_be_added);
			$billingparams = array('supervisor_id'=>$val->supervisor_id,'customer_id'=>$val->id,'house_no'=>$val->house_no,'customer_address'=>$val->address,'amount'=>$amount_to_be_added);
			//}
			$result = ChargesModel::createChargeForCustomers($billingparams);
		}
		$response=array(); 
		if($result)
		{
            
            return BaseController::sendResponse($response, 'Charges Created Successfully.');
        }
		else
		{
           return BaseController::sendResponse($response, 'Charges Not Created.');
		 
	    }
	
}


public function confirmPayment(Request $request)
{
	
	$data = $request->json()->all();
	$id = $data['customer_address_id'];
	$getUsersData = ChargesModel::getUsersData($id);
	$data['project_id'] = $getUsersData->project_id;
	$data['project_ward_id'] = $getUsersData->project_ward_id;
	$data['supervisor_id'] = $getUsersData->supervisor_id;
	
	$result = ChargesModel::confirmPayment($data);
	
	
	
	return BaseController::sendResponse($result, 'Payment Done Successfully.');
	
	
}



public function getPayments(Request $request)
{
	
	$data = $request->json()->all();
	$result = ChargesModel::getPayments($data);
	if($result)
	{
		foreach($result as $key=>$val)
		{
				
			    $getCustomerNameAndHouseNo = ChargesModel::getCustomerNameAndHouseNo($val->customer_address_id);
				$getWardName =  CustomerModel::getWardName($val->project_ward_id);
				$getProjectName =  CustomerModel::getProjectName($val->project_id);
				$getCategoryName =  CustomerModel::getCategoryName($getCustomerNameAndHouseNo->category_id);
				$getSubCategoryName =  CustomerModel::getSubCategoryName($getCustomerNameAndHouseNo->sub_category_id);
				$getCustomerTypeName =  CustomerModel::getCustomerTypeName($getCustomerNameAndHouseNo->customer_type);
				$getSupervisorName = CustomerModel::getSupervisorName($val->supervisor_id);
				
				$getBillingAmount = ChargesModel::getBillingAmount($val->customer_address_id);
				$getPaymentAmount = ChargesModel::getPaymentAmount($val->customer_address_id);
				
				 
			
			$result[$key]->project_name = $getProjectName->project_name ?? '';
			$result[$key]->project_ward_name = $getWardName->ward_name ?? '';
			$result[$key]->customer_type_name =$getCustomerTypeName->customer_type ?? ''; 
			$result[$key]->category_name =$getCategoryName->category_name ?? '';
            $result[$key]->sub_category_name =$getSubCategoryName->sub_category_name ?? '';
            $result[$key]->house_no =	$getCustomerNameAndHouseNo->house_no;
            $result[$key]->supervisor_name =$getSupervisorName->name ?? '';
            $result[$key]->customer_name =$getCustomerNameAndHouseNo->name;
            $result[$key]->pending_amount =	($getBillingAmount-$getPaymentAmount);
//$result[$key]->getBillingAmount =	$getBillingAmount;
//$result[$key]->getPaymentAmount =	$getPaymentAmount;			
		}
	return BaseController::sendResponse($result, 'Data Found.');
	}
	else
	{
	$response = array();
	return BaseController::sendResponse($response, 'Data Not Found.');	
	}
	
	
}



public function getCustomerAddress(Request $request)
{
	    $data = $request->json()->all();
	    if(!isset($data['supervisor_id']) || empty($data['supervisor_id']))
		{
                return $this->sendError('Supervisor Id cannot be empty.',['error'=>'Supervisor Id cannot be empty']);
        }
		
		if(!isset($data['customer_id']) || empty($data['customer_id']))
		{
                return $this->sendError('Customer Id cannot be empty.',['error'=>'Customer Id cannot be empty']);
        }
		$response = array();
		
		$params = array('supervisor_id'=>$data['supervisor_id'],'user_id'=>$data['customer_id']);
		$getCustomersData = ChargesModel::getCustomerAddress($params);
		
		if($getCustomersData)	
		{
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
				
			    $parameters = array('project_id'=>$val->project_id,'customer_type'=>$val->customer_type,'category_id'=>$val->category_id,'sub_category_id'=>$val->sub_category_id);
			    $getAmount = ChargesModel::getAmount($parameters);
				if(!empty($getAmount))
				{
			    $amount = $amount_to_be_added = $getAmount->charges;
				}
				else
				{
				$amount = "";	
				}
				
				$getCustomersData[$key]->supervisor_name = $getSupervisorName->name ?? '';
				$getCustomersData[$key]->role_name = $getRoleName->role_name ?? '';
				$getCustomersData[$key]->state_name = $getStateName->state_name ?? '';
				$getCustomersData[$key]->city_name = $getCityName->city_name ?? '';
				$getCustomersData[$key]->ward_name = $getWardName->ward_name ?? '';
				$getCustomersData[$key]->project_name = $getProjectName->project_name ?? '';
				$getCustomersData[$key]->customer_type_name=$getCustomerTypeName->customer_type ?? '';
				$getCustomersData[$key]->category_name = $getCategoryName->category_name ?? '';
				$getCustomersData[$key]->sub_category_name = $getSubCategoryName->sub_category_name ?? '';
				$getCustomersData[$key]->amount = $amount;
				   
				}
			return BaseController::sendResponse($getCustomersData, 'Data Found.');
			
		}
		else
		{
			return BaseController::sendResponse($response, 'Data Not Found.');
		}
	
	
}


}
?>