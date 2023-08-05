<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:donation-list|donation-create|donation-edit|donation-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:donation-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:donation-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:donation-delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $donations = Donation::orderBy('id', 'DESC')->paginate(5)->toArray();
        return Inertia::render('Backoffice/Admin/DonationManagement', ['donations' => $donations]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'payment_id' => 'required',
            'status' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'name' => 'required',
            'social_link' => 'required',
            'address' => 'required',
        ]);
        $input = $request->all();
        Donation::create($input);
        return redirect()->route('donation.index')->with('success', 'Donation successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $donation = Donation::find($id);
        return response()->json(['donation' => $donation], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     */
    public function edit($id)
    {
        $donation = Donation::find($id);
        return response()->json(['donation' => $donation], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'payment_id' => 'required',
            'status' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'name' => 'required',
            'social_link' => 'required',
            'address' => 'required',
        ]);
        $input = $request->all();
        Donation::find($id)->update($input);
        return redirect()->route('donation.index')->with('success', 'Update successfully');
    }

    /*
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        Donation::find($id)->delete();
        return redirect()->route('donation.index')->with('success', 'deleted successfully');
    }
}
