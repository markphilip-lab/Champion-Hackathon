<?php

namespace App\Http\Controllers;

use App\Models\EquipmentIssue;
use Illuminate\Http\Request;

class EquipmentIssueController extends Controller
{
    public function index()
    {
        $equipmentIssue = EquipmentIssue::latest()->get();
        return response()->json($equipmentIssue);
    }

    public function create()
    {
        return view('equipment_issues.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'lab_number' => [
            'required', 
            'string', 
            'in:Lab A,Lab B,Lab C,Mac Lab'
            ],
            'equipment_type' => [
            'required', 
            'string', 
            'in:Monitor,Keyboard,Mouse,LAN Cable'
            ],
            'issue_description' => [
            'required', 
            'string'
            ],
            'reported_by' => [
            'required', 
            'string', 
            'max:255'
            ],
            'severity' =>  [
            'required', 
            'string', 
            'in:Low,Medium,High'],
        ]);

        \App\Models\EquipmentIssue::create($validated);

        return redirect()->route('equipment_issues.index');

    }

    public function show($id)
    {
        $equipmentIssue = \App\Models\EquipmentIssue::findOrFail($id);
        return view('equipment_issues.show', compact('equipmentIssue'));
    }

    public function edit($id)
    {
        $equipmentIssue = \App\Models\EquipmentIssue::findOrFail($id);
        return view('equipment_issues.edit', compact('equipmentIssue'));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'lab_number' => [
            'required', 
            'string', 
            'in:Lab A,Lab B,Lab C,Mac Lab'
            ],
            'equipment_type' => [
            'required', 
            'string', 
            'in:Monitor,Keyboard,Mouse,LAN Cable'
            ],
            'issue_description' => [
            'required', 
            'string'
            ],
            'reported_by' => [
            'required', 
            'string', 
            'max:255'
            ],
            'severity' =>  [
            'required', 
            'string', 
            'in:Low,Medium,High'],
        ]);

        $equipmentIssue = \App\Models\EquipmentIssue::findOrFail($id);
        $equipmentIssue->update($validated);

        return redirect()->route('equipment_issues.index');
    }

    public function destroy($id)
    {
        $equipmentIssue = \App\Models\EquipmentIssue::findOrFail($id);
        $equipmentIssue->delete();

        return redirect()->route('equipment_issues.index');
    }
}
