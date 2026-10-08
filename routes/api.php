<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/equipment_issues', [\App\Http\Controllers\EquipmentIssueController::class, 'index']);
Route::post('/equipment_issues', [\App\Http\Controllers\EquipmentIssueController::class, 'store']);
Route::get('/equipment_issues/{id}', [\App\Http\Controllers\EquipmentIssueController::class, 'show']);
Route::put('/equipment_issues/{id}', [\App\Http\Controllers\EquipmentIssueController::class, 'update']);
Route::delete('/equipment_issues/{id}', [\App\Http\Controllers\EquipmentIssueController::class, 'destroy']);
