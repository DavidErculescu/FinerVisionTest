<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Entity\FinerForm as FineFormModel;

class FinerFormController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // validate
        $this->validate($request, [
            'firstname' => 'required',
            'surname' => 'required',
            'email' => 'required|email',
            'number' => 'required',
            'birth' => 'required|date',
            'gender' => 'required',
            'comments' => '',
        ]);

        $form = new FineFormModel();
            $form->firstname = $request["firstname"];
            $form->surname = $request["surname"];
            $form->email = $request["email"];
            $form->number = $request["number"];
            $form->birth = $request["birth"];
            $form->gender = $request["gender"];
            $form->comments = $request["comments"];
        $form->save();

        // return task with user object
        return response()->json('Successfully added');
    }
}
