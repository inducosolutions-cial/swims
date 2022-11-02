<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request; 
use App\Http\Controllers\API\BaseController as BaseController;   
use App\Models\User;
use App\Models\MasterModel;  
use Hash;
use Illuminate\Support\Facades\Auth; 
use Validator;
use File;
use URL;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;


class MasterController extends BaseController
{    
     
     public function addState(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		if(!isset($data['state_name']) || empty($data['state_name']))
		{
            return $this->sendError('State name cannot be empty.',['error'=>'State name cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		 
		$state_name = $data['state_name'];
		$check_state_name = MasterModel::check_state_name($state_name,$data['user_id']);
		if(!empty($check_state_name->state_name))
		{
			return $this->sendError('State already exists.',['error'=>'State already exists']); 
		}
		 
		$data['status'] = 1;
		$res = MasterModel::addState($data);
		
		 
        if($res)
		{
             $response=array();
            return BaseController::sendResponse($response, 'State Added Successfully.');
        }
		else
		{
            return BaseController::sendError('State Not Added,Something Went Wrong.', ['error'=>'State Not Added,Something Went Wrong.']);
		 
	    }

     
	 }
	 
	 public function getStates(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		  
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		 
		  
		$res = MasterModel::getStates($data);
		
		 
        if($res)
		{
             $response=array();
            return BaseController::sendResponse($res, 'Data found.');
        }
		else
		{
            return BaseController::sendError('Data not found,Something Went Wrong.', ['error'=>'Data not found,Something Went Wrong.']);
		 
	    }

     
	 }
	 
	 
	 
	 public function updateState(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		if(!isset($data['state_id']) || empty($data['state_id']))
		{
            return $this->sendError('State id cannot be empty.',['error'=>'State id cannot be empty']);
        }
		 
		if(!isset($data['state_name']) || empty($data['state_name']))
		{
            return $this->sendError('State name cannot be empty.',['error'=>'State name cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		 
		$state_name = $data['state_name'];
		$check_state_name = MasterModel::check_state_name($state_name,$data['user_id']);
		if(!empty($check_state_name->state_name))
		{
			return $this->sendError('State already exists.',['error'=>'State already exists']); 
		}
		  
		$res = MasterModel::updateState($data);
		
		 
        if($res)
		{
             $response=array();
            return BaseController::sendResponse($response, 'Updated Successfully.');
        }
		else
		{
            return BaseController::sendError('Not Updated,Something Went Wrong.', ['error'=>'Not Updated,Something Went Wrong.']);
		 
	    }

     
	 }




public function addCity(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		if(!isset($data['city_name']) || empty($data['city_name']))
		{
            return $this->sendError('City name cannot be empty.',['error'=>'City name cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		if(!isset($data['state_id']) || empty($data['state_id']))
		{
            return $this->sendError('State id cannot be empty.',['error'=>'State id cannot be empty']);
        }
		 
		 
		  
		 
		$params = array('city_name'=>$data['city_name'],'state_id'=>$data['state_id']);
		 
		$check_city_name = MasterModel::check_city_name($params);
		if(!empty($check_city_name->city_name))
		{
			return $this->sendError('City already exists.',['error'=>'City already exists']); 
		}
		 
		  
		$params1 = array('city_name'=>$data['city_name'],'state_id'=>$data['state_id'],'user_id'=>$data['user_id'],'status'=>1);
		$res = MasterModel::addCity($params1);
		
		 
        if($res)
		{
            $response=array();
            return BaseController::sendResponse($response, 'City Added Successfully.');
        }
		else
		{
            return BaseController::sendError('City Not Added,Something Went Wrong.', ['error'=>'City Not Added,Something Went Wrong.']);
		 
	    }

     
	 }
	 
	 
	 public function getCities(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		if(!isset($data['state_id']) || empty($data['state_id']))
		{
            return $this->sendError('State id cannot be empty.',['error'=>'State id cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		 
		  
		$res = MasterModel::getCities($data);
		
		 
        if($res)
		{
             $response=array();
            return BaseController::sendResponse($res, 'Data found.');
        }
		else
		{
            return BaseController::sendError('Data not found,Something Went Wrong.', ['error'=>'Data not found,Something Went Wrong.']);
		 
	    }

     
	 }
	 
	 
	 public function updateCity(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		if(!isset($data['state_id']) || empty($data['state_id']))
		{
            return $this->sendError('State id cannot be empty.',['error'=>'State id cannot be empty']);
        }
		 
		if(!isset($data['city_id']) || empty($data['city_id']))
		{
            return $this->sendError('City id cannot be empty.',['error'=>'City id cannot be empty']);
        }
		 
		if(!isset($data['city_name']) || empty($data['city_name']))
		{
            return $this->sendError('City name cannot be empty.',['error'=>'City name cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		 
		$params = array('city_name'=>$data['city_name'],'state_id'=>$data['state_id'],'city_id'=>$data['city_id']);
		 
		$check_city_name = MasterModel::check_city_name($params);
		if(!empty($check_city_name->city_name))
		{
			return $this->sendError('City already exists.',['error'=>'City already exists']); 
		}
		  
		$res = MasterModel::updateCity($data);
		
		 
        if($res)
		{
             $response=array();
            return BaseController::sendResponse($response, 'Updated Successfully.');
        }
		else
		{
            return BaseController::sendError('Not Updated,Something Went Wrong.', ['error'=>'Not Updated,Something Went Wrong.']);
		 
	    }

     
	 }


public function addWard(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		if(!isset($data['ward_name']) || empty($data['ward_name']))
		{
            return $this->sendError('Ward name cannot be empty.',['error'=>'Ward name cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		if(!isset($data['state_id']) || empty($data['state_id']))
		{
            return $this->sendError('State id cannot be empty.',['error'=>'State id cannot be empty']);
        }
		 
		if(!isset($data['city_id']) || empty($data['city_id']))
		{
            return $this->sendError('City id cannot be empty.',['error'=>'City id cannot be empty']);
        }
		 
		 
		  
		 
		$params = array('ward_name'=>$data['ward_name'],'state_id'=>$data['state_id'],'city_id'=>$data['city_id']);
		 
		$check_ward_name = MasterModel::check_ward_name($params);
		if(!empty($check_ward_name->ward_name))
		{
			return $this->sendError('Ward already exists.',['error'=>'Ward already exists']); 
		}
		 
		 
		$params1 = array('ward_name'=>$data['ward_name'],'state_id'=>$data['state_id'],'city_id'=>$data['city_id'],'user_id'=>$data['user_id'],'status'=>1,
		 'ward_locality'=>$data['ward_locality'],
		 'ward_address'=>$data['ward_address'],
		 'ward_pincode'=>$data['ward_pincode'],
		 'contact_number'=>$data['contact_number']
		 );
		$res = MasterModel::addWard($params1);
		
		 
        if($res)
		{
             $response=array();
            return BaseController::sendResponse($response, 'Ward Added Successfully.');
        }
		else
		{
            return BaseController::sendError('Ward Not Added,Something Went Wrong.', ['error'=>'Ward Not Added,Something Went Wrong.']);
		 
	    }

     
	 }
	 
	 
	 public function getWards(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		if(!isset($data['city_id']) || empty($data['city_id']))
		{
            return $this->sendError('City id cannot be empty.',['error'=>'City id cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		if(!isset($data['state_id']) || empty($data['state_id']))
		{
            return $this->sendError('State id cannot be empty.',['error'=>'State id cannot be empty']);
        }
	
	
	
	    $params = array('state_id'=>$data['state_id'],'user_id'=>$data['user_id'],'city_id'=>$data['city_id']);
	    $res = MasterModel::getWards($params);
		
		 
        if($res)
		{
             $response=array();
            return BaseController::sendResponse($res, 'Data Found.');
        }
		else
		{
            return BaseController::sendError('Data Not Found,Something Went Wrong.', ['error'=>'Data Not Found,Something Went Wrong.']);
		 
	    }

     
	 }
	 
	 
	 
	 public function updateWard(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		if(!isset($data['state_id']) || empty($data['state_id']))
		{
            return $this->sendError('State id cannot be empty.',['error'=>'State id cannot be empty']);
        }
		 
		if(!isset($data['city_id']) || empty($data['city_id']))
		{
            return $this->sendError('City id cannot be empty.',['error'=>'City id cannot be empty']);
        }
		 
		if(!isset($data['ward_id']) || empty($data['ward_id']))
		{
            return $this->sendError('Ward id cannot be empty.',['error'=>'Ward id cannot be empty']);
        }
		 
		if(!isset($data['ward_name']) || empty($data['ward_name']))
		{
            return $this->sendError('Ward name cannot be empty.',['error'=>'Ward name cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		  
		 $params = array('ward_name'=>$data['ward_name'],'state_id'=>$data['state_id'],'city_id'=>$data['city_id'],'ward_id'=>$data['ward_id'],'ward_locality'=>$data['ward_locality'],
		 'ward_address'=>$data['ward_address'],
		 'ward_pincode'=>$data['ward_pincode'],
		 'contact_number'=>$data['contact_number']);
		 $check_ward_name = MasterModel::check_ward_name($params);
		if(!empty($check_ward_name->ward_id))
		{
			return $this->sendError('Ward already exists.',['error'=>'Ward already exists']); 
		}
		  
		  
		 
		$res = MasterModel::updateWard($params);
		
		 
        if($res)
		{
             $response=array();
            return BaseController::sendResponse($response, 'Updated Successfully.');
        }
		else
		{
            return BaseController::sendError('Not Updated,Something Went Wrong.', ['error'=>'Not Updated,Something Went Wrong.']);
		 
	    }

     
	 }
	 
	 
	 
	 public function addProjectType(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		if(!isset($data['project_type_name']) || empty($data['project_type_name']))
		{
            return $this->sendError('Project Type name cannot be empty.',['error'=>'Project Type name cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		$project_type_name = $data['project_type_name'];
		$check_project_type_name = MasterModel::check_project_type_name($project_type_name,$data['user_id']);
		if(!empty($check_project_type_name->project_type_name))
		{
			return $this->sendError('Project Type already exists.',['error'=>'Project Type already exists']); 
		}
		 
		$data['status'] = 1;
		$res = MasterModel::addProjectType($data);
		
		 
        if($res)
		{
            $response=array();
            return BaseController::sendResponse($response, 'Project Type Added Successfully.');
        }
		else
		{
            return BaseController::sendError('Project Type Not Added,Something Went Wrong.', ['error'=>'Project Type Not Added,Something Went Wrong.']);
		 
	    }
	 }
	 
	 
	 public function getProjectTypes(Request $request)
	 {
		 
		$data = $request->json()->all();
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
	 	 
		$res = MasterModel::getProjectTypes($data);
		if($res)
		{
             $response=array();
            return BaseController::sendResponse($res, 'Data Found.');
        }
		else
		{
            return BaseController::sendError('Data Not Found,Something Went Wrong.', ['error'=>'Data Not Found,Something Went Wrong.']);
		 
	    }
	 }
	 
	 public function updateProjectType(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		if(!isset($data['project_type_name']) || empty($data['project_type_name']))
		{
            return $this->sendError('Project type name cannot be empty.',['error'=>'Project type name cannot be empty']);
        }
		 
		if(!isset($data['project_type_id']) || empty($data['project_type_id']))
		{
            return $this->sendError('Project type id cannot be empty.',['error'=>'Project type id cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		$project_type_name = $data['project_type_name'];
		$check_project_type_name = MasterModel::check_project_type_name($project_type_name,$data['user_id']);
		if(!empty($check_project_type_name->project_type_name))
		{
			return $this->sendError('Project Type already exists.',['error'=>'Project Type already exists']); 
		}
		 
		  
		$res = MasterModel::updateProjectType($data);
		
		 
        if($res)
		{
             $response=array();
            return BaseController::sendResponse($response, 'Project Type Updated Successfully.');
        }
		else
		{
            return BaseController::sendError('Project Type Not Updated,Something Went Wrong.', ['error'=>'Project Type Not Updated,Something Went Wrong.']);
		 
	    }
	 }
	 
	 
	 public function addCustomerType(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		if(!isset($data['customer_type']) || empty($data['customer_type']))
		{
            return $this->sendError('Customer type cannot be empty.',['error'=>'Customer type cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		$customer_type = $data['customer_type'];
		$check_customer_type = MasterModel::check_customer_type($customer_type);
		if(!empty($check_customer_type->customer_type))
		{
			return $this->sendError('Customer type already exists.',['error'=>'Customer type already exists']); 
		}
		 
		$data['status'] = 1;
		$res = MasterModel::addCustomerType($data);
		
		 
        if($res)
		{
             $response=array();
            return BaseController::sendResponse($response, 'Customer type Added Successfully.');
        }
		else
		{
            return BaseController::sendError('Customer type Not Added,Something Went Wrong.', ['error'=>'Customer type Not Added,Something Went Wrong.']);
		 
	    }
	 }
	 
	 
	 public function getCustomerTypes(Request $request)
	 {
		 
		$data = $request->json()->all();
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
	 	 
		$res = MasterModel::getCustomerTypes($data);
		if($res)
		{
             $response=array();
            return BaseController::sendResponse($res, 'Data Found.');
        }
		else
		{
            return BaseController::sendError('Data Not Found,Something Went Wrong.', ['error'=>'Data Not Found,Something Went Wrong.']);
		 
	    }
	 }
	 
	 public function updateCustomerType(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		if(!isset($data['customer_type']) || empty($data['customer_type']))
		{
            return $this->sendError('Customer type cannot be empty.',['error'=>'Customer type cannot be empty']);
        }
		 
		if(!isset($data['customer_type_id']) || empty($data['customer_type_id']))
		{
            return $this->sendError('Customer type id cannot be empty.',['error'=>'Customer type id cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		$customer_type = $data['customer_type'];
		$check_customer_type = MasterModel::check_customer_type($customer_type);
		if(!empty($check_customer_type->customer_type))
		{
			return $this->sendError('Customer type already exists.',['error'=>'Customer type already exists']); 
		}
		 
		$params = array('customer_type'=>$data['customer_type'],'customer_type_id'=>$data['customer_type_id']);
		$res = MasterModel::updateCustomerType($params);
		
		 
        if($res)
		{
             $response=array();
            return BaseController::sendResponse($response, 'Customer type Updated Successfully.');
        }
		else
		{
            return BaseController::sendError('Customer type Not Updated,Something Went Wrong.', ['error'=>'Customer type Not Updated,Something Went Wrong.']);
		 
	    }
	 }
	 
	 
	 
	 
	 
	 
	 public function addCategory(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		if(!isset($data['category_name']) || empty($data['category_name']))
		{
            return $this->sendError('Category name cannot be empty.',['error'=>'Category name cannot be empty']);
        }
		 
		 
		if(!isset($data['customer_type_id']) || empty($data['customer_type_id']))
		{
            return $this->sendError('Customer type id cannot be empty.',['error'=>'Customer type id cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		 
		$category_name = $data['category_name'];
		$check_category_name = MasterModel::check_category_name($category_name,$data['customer_type_id']);
		if(!empty($check_category_name->category_name))
		{
			return $this->sendError('Category already exists.',['error'=>'Category already exists']); 
		}
		 
		$data['status'] = 1;
		$res = MasterModel::addCategory($data);
		
		 
        if($res)
		{
             $response=array();
            return BaseController::sendResponse($response, 'Category Added Successfully.');
        }
		else
		{
            return BaseController::sendError('Category Not Added,Something Went Wrong.', ['error'=>'Category Not Added,Something Went Wrong.']);
		 
	    }

     
	 }
	 
	 public function getCategories(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		  
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		 
		if(!isset($data['customer_type_id']) || empty($data['customer_type_id']))
		{
            return $this->sendError('Customer type id cannot be empty.',['error'=>'Customer type id cannot be empty']);
        }
		 
		$res = MasterModel::getCategories($data);
		 
		 
        /*if(!empty($res[0]))
		{
         return BaseController::sendResponse($res, 'Data found.');
        }
		else
		{
            return BaseController::sendError($res,'Data Not found.');
	    }*/

		if(!empty($res[0]))
				{
					$message = "Data Found";
				}
		else
		{
			$message = "Data Not Found";
		}
		return BaseController::sendResponse($res,$message);
     
	 }
	 
	 
	 
	 public function updateCategory(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		if(!isset($data['category_id']) || empty($data['category_id']))
		{
            return $this->sendError('Category id cannot be empty.',['error'=>'Category id cannot be empty']);
        }
		 
		if(!isset($data['category_name']) || empty($data['category_name']))
		{
            return $this->sendError('Category name cannot be empty.',['error'=>'Category name cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		if(!isset($data['customer_type_id']) || empty($data['customer_type_id']))
		{
            return $this->sendError('Customer type id cannot be empty.',['error'=>'Customer type id cannot be empty']);
        }
		 
		 $category_name = $data['category_name'];
		 $check_category_name = MasterModel::check_category_name($category_name,$data['customer_type_id']);
		 if(!empty($check_category_name->category_name))
		{
			return $this->sendError('Category already exists.',['error'=>'Category already exists']); 
		}
		  
		 $res = MasterModel::updateCategory($data);
		
		 
        if($res)
		{
             $response=array();
            return BaseController::sendResponse($response, 'Updated Successfully.');
        }
		else
		{
            return BaseController::sendError('Not Updated,Something Went Wrong.', ['error'=>'Not Updated,Something Went Wrong.']);
		 
	    }

     
	 }
	 
	 
	 
	 public function addSubCategory(Request $request)
	 {
		 
		$data = $request->json()->all();
		  
		  
		if(!isset($data['customer_type_id']) || empty($data['customer_type_id']))
		{
            return $this->sendError('Customer type id cannot be empty.',['error'=>'Customer type id cannot be empty']);
        }  
		  
		 
		if(!isset($data['sub_category_name']) || empty($data['sub_category_name']))
		{
            return $this->sendError('Sub category name cannot be empty.',['error'=>'Sub category name cannot be empty']);
        }
		 
		 
		if(!isset($data['category_id']) || empty($data['category_id']))
		{
            return $this->sendError('Category id cannot be empty.',['error'=>'Category id cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		$params = array('category_id'=>$data['category_id'],'sub_category_name'=>$data['sub_category_name'],'customer_type_id'=>$data['customer_type_id']);
		 
		
		$check_sub_category_name = MasterModel::check_sub_category_name($params);
		if(!empty($check_sub_category_name->sub_category_name))
		{
			return $this->sendError('Sub category already exists.',['error'=>'Sub category already exists']); 
		}
		 
		 
		$params1 = array('category_id'=>$data['category_id'],'sub_category_name'=>$data['sub_category_name'],'customer_type_id'=>$data['customer_type_id'],'user_id'=>$data['user_id'],'status'=>1);
		$res = MasterModel::addSubCategory($params1);
		
		 
        if($res)
		{
             $response=array();
            return BaseController::sendResponse($response, 'Subcategory Added Successfully.');
        }
		else
		{
            return BaseController::sendError('Subcategory Not Added,Something Went Wrong.', ['error'=>'Subcategory Not Added,Something Went Wrong.']);
		 
	    }

     
	 }
	 
	 public function getSubCategories(Request $request)
	 {
		 
		  $data = $request->json()->all();
		 
		if(!isset($data['customer_type_id']) || empty($data['customer_type_id']))
		{
            return $this->sendError('Customer type id cannot be empty.',['error'=>'Customer type id cannot be empty']);
        } 
		 
		if(!isset($data['category_id']) || empty($data['category_id']))
		{
            return $this->sendError('Category id cannot be empty.',['error'=>'Category id cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		  
		 $res = MasterModel::getSubCategories($data);
		
		 
        if(!empty($res[0]))
		{
          $message = "Data Found";
        }
		else
		{
         $message = "Data Not Found";
	    }

     return BaseController::sendResponse($res,$message); 
	 }
	 
	 
	 
	 public function updateSubCategory(Request $request)
	 {
		 
		  $data = $request->json()->all();
		 
		if(!isset($data['category_id']) || empty($data['category_id']))
		{
            return $this->sendError('Category id cannot be empty.',['error'=>'Category id cannot be empty']);
        }
		 
		if(!isset($data['sub_category_id']) || empty($data['sub_category_id']))
		{
            return $this->sendError('Subcategory id cannot be empty.',['error'=>'Subcategory id cannot be empty']);
        }
		 
		if(!isset($data['sub_category_name']) || empty($data['sub_category_name']))
		{
            return $this->sendError('Sub category name cannot be empty.',['error'=>'Sub category name cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		if(!isset($data['customer_type_id']) || empty($data['customer_type_id']))
		{
            return $this->sendError('Customer type id cannot be empty.',['error'=>'Customer type id cannot be empty']);
        } 
		 
		 $params = array('sub_category_id'=>$data['sub_category_id'],'category_id'=>$data['category_id'],'sub_category_name'=>$data['sub_category_name'],'customer_type_id'=>$data['customer_type_id']);
		 
		 $sub_category_name = $data['sub_category_name'];
		 $check_sub_category_name = MasterModel::check_sub_category_name($params);
		if(!empty($check_sub_category_name->sub_category_name))
		{
			return $this->sendError('Sub category already exists.',['error'=>'Sub category already exists']); 
		}
		  
		 $res = MasterModel::updateSubCategory($params);
		
		 
        if($res)
		{
             $response=array();
            return BaseController::sendResponse($response, 'Updated Successfully.');
        }
		else
		{
            return BaseController::sendError('Not Updated,Something Went Wrong.', ['error'=>'Not Updated,Something Went Wrong.']);
		 
	    }

     
	 }
	 

}
?>