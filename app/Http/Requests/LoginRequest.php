<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:20|exists:users,name',
            'password' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Il campo nome utente è obbligatorio.',
            'name.max' => 'Il nome utente può avere una lunghezza massima di 20 caratteri.',
            'name.exists' => 'Il nome utente inserito non esiste.',
            'password.required' => 'Il campo password è obbligatorio.'
        ];
    }
}
