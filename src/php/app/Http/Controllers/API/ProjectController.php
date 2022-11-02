<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request; 
use App\Http\Controllers\API\BaseController as BaseController;   
use App\Models\User;
use App\Models\ProjectModel;  
use Hash;
use Illuminate\Support\Facades\Auth; 
use Validator;
use File;
use URL;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;


class ProjectController extends BaseController
{    
     
     public function addProject(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		if(!isset($data['project_name']) || empty($data['project_name']))
		{
            return $this->sendError('Project Type name cannot be empty.',['error'=>'Project Type name cannot be empty']);
        }
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		$project_name = $data['project_name'];
		$check_project_name = ProjectModel::check_project_name($project_name);
		if(!empty($check_project_name->project_name))
		{
			return $this->sendError('Project already exists.',['error'=>'Project already exists']); 
		}
		 
		$data['status'] = 1;
		$res = ProjectModel::addProject($data);
		
		$project_id = $res;
		$result = ProjectModel::getProjectDetails($project_id);
		 foreach($result as $key=>$val)
		{
			$project_type_name = ProjectModel::project_type_name($val->project_type_id);
			$result[$key]->project_type_name = $project_type_name->project_type_name ?? '';
			
		}
		 
		 
		 
        if($result)
		{
            $response=array();
            return BaseController::sendResponse($result, 'Project Added Successfully.');
        }
		else
		{
            return BaseController::sendError('Project Not Added,Something Went Wrong.', ['error'=>'Project Not Added,Something Went Wrong.']);
		 
	    }
	 }
	 
	 
	 public function getProjects(Request $request)
	 {
		 
		$data = $request->json()->all();
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
	 	 $projects_wards = [];
		$res = ProjectModel::getProjects($data);
		/*foreach($res as $key=>$val)
		{
			$dataa['project_id'] = $val->project_id;
			$dataa['project_name'] = $val->project_name;
			$dataa['description'] = $val->description;
			$dataa['wards_list'] = ProjectModel::get_wards_list($val->project_id);
			//$dataa['wardsCount'] = count($dataa['wards_list']);
			foreach($dataa['wards_list'] as $kk=>$vv)
			{
				$statename = ProjectModel::getStateName($vv->state_id);
				$cityname = ProjectModel::getCityName($vv->city_id);
				$dataa['wards_list'][$kk]->state_name = $statename->state_name;
				$dataa['wards_list'][$kk]->city_name = $cityname->city_name;
			}
			
			array_push($projects_wards,$dataa);
		}*/
		
		foreach($res as $key=>$val)
		{
			$project_type_name = ProjectModel::project_type_name($val->project_type_id);
			$res[$key]->project_type_name = $project_type_name->project_type_name ?? '';
			$res[$key]->wards_count = count(ProjectModel::wards_count($val->project_id));
		}
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
	 
	 public function updateProject(Request $request)
	 {
		 
		$data = $request->json()->all();
		 
		if(!isset($data['project_name']) || empty($data['project_name']))
		{
            return $this->sendError('Project name cannot be empty.',['error'=>'Project name cannot be empty']);
        }
		 
		if(!isset($data['project_id']) || empty($data['project_id']))
		{
            return $this->sendError('Project id cannot be empty.',['error'=>'Project id cannot be empty']);
        }
		
		
		 
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		 
		$project_name = $data['project_name'];
		$check_project_name = ProjectModel::check_project_name_by_user($project_name,$data['project_id']);
		if(!empty($check_project_name->project_name))
		{
			return $this->sendError('Project already exists.',['error'=>'Project already exists']); 
		}
		 
		  
		$res = ProjectModel::updateProject($data);
		$response=array();
		if($res)
		{
             
            return BaseController::sendResponse($response, 'Project Updated Successfully.');
        }
		else
		{
            return BaseController::sendResponse($response, 'Project Not Updated.');
		 
	    }
	 }
	 


public function addProjectWard(Request $request)
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
		
		
		if(!isset($data['project_id']) || empty($data['project_id']))
		{
            return $this->sendError('Project id cannot be empty.',['error'=>'Project id cannot be empty']);
        }
		 
		$ward_name = $data['ward_name'];
		$project_id = $data['project_id'];
		$check_project_ward_name = ProjectModel::check_project_ward_name($ward_name,$project_id);
		if(!empty($check_project_ward_name->ward_name))
		{
			return $this->sendError('Ward Name already exists.',['error'=>'Ward Name already exists']); 
		}
		
		$ward_number = $data['ward_number'];
		$check_project_ward_number = ProjectModel::check_project_ward_number($ward_number,$project_id);
		if(!empty($check_project_ward_number->ward_number))
		{
			return $this->sendError('Ward Number already exists.',['error'=>'Ward Number already exists']); 
		}
		 
		$data['status'] = 1;
		$res = ProjectModel::addProjectWard($data);
		
		 
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



public function getWardsByProjectId(Request $request)
	 {
		 
		$data = $request->json()->all();
		if(!isset($data['user_id']) || empty($data['user_id']))
		{
            return $this->sendError('User id cannot be empty.',['error'=>'User id cannot be empty']);
        }
		if(!isset($data['project_id']) || empty($data['project_id']))
		{
            return $this->sendError('Project id cannot be empty.',['error'=>'Project id cannot be empty']);
        }
	 	 
		$res = ProjectModel::getWardsByProjectId($data['project_id']);
		foreach($res as $key=>$val)
		{
			//$getSupervisor =  ProjectModel::getSupervisor($val->ward_number,$val->project_id);
			$getSupervisor =  ProjectModel::getSupervisor($val->project_ward_id,$val->project_id);
			$getStateName =  User::getStateName($val->state_id);
			$getCityName =  User::getCityName($val->city_id);
			$res[$key]->state_name =$getStateName->state_name ?? '';
			$res[$key]->city_name = $getCityName->city_name ?? '';
			$res[$key]->supervisor_id = $getSupervisor->user_id ?? '';
            $res[$key]->supervisor_name = $getSupervisor->name ?? '';			

		}			
		if($res)
		{
             
            return BaseController::sendResponse($res, 'Data Found.');
        }
		else
		{
            return BaseController::sendError('Data Not Found,Something Went Wrong.', ['error'=>'Data Not Found,Something Went Wrong.']);
		 
	    }
	 }



     public function updateProjectWard(Request $request)
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
		
		
		if(!isset($data['project_id']) || empty($data['project_id']))
		{
            return $this->sendError('Project id cannot be empty.',['error'=>'Project id cannot be empty']);
        }
		
		if(!isset($data['project_ward_id']) || empty($data['project_ward_id']))
		{
            return $this->sendError('Project ward id cannot be empty.',['error'=>'Project ward id cannot be empty']);
        }
		$ward_name = $data['ward_name'];
		
		$project_ward_id = $data['project_ward_id'];
		$project_id = $data['project_id'];
		$check_project_ward_name_by_wardid = ProjectModel::check_project_ward_name_by_wardid($ward_name,$project_id,$project_ward_id);
		if(!empty($check_project_ward_name_by_wardid->ward_name))
		{
			return $this->sendError('Ward Name Already Exists.',['error'=>'Ward Name Already Exists']); 
		}
		
		$ward_number = $data['ward_number'];
		$check_project_ward_number_by_wardid = ProjectModel::check_project_ward_number_by_wardid($ward_number,$project_id,$project_ward_id);
		if(!empty($check_project_ward_number_by_wardid->ward_number))
		{
			return $this->sendError('Ward Number Already Exists.',['error'=>'Ward Number Already Exists']); 
		}
		 
		 
		$res = ProjectModel::updateProjectWard($data);
		$response=array(); 
        if($res)
		{
            return BaseController::sendResponse($response, 'Ward Updated Successfully.');
        }
		else
		{
            return BaseController::sendResponse($response, 'Ward Not Updated.');
	    }
	 }



}
?>