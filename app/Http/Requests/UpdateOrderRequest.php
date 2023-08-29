<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
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
            'customer' => 'required|string|min:5',
            'email' => 'required|email:rfc,dns',
            'amount' => 'required',
            'state' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'customer.required' => 'Il campo cliente è obbligatorio.',
            'customer.string' => 'Il campo cliente deve essere di tipo testo.',
            'customer.min' => 'Il campo cliente deve contenere almeno 5 caratteri.',
            'email.required' => 'Il campo email è obbligatorio.',
            'email.email' => 'Inserisci un indirizzo email valido.',
            'amount.required' => 'Il campo totale è obbligatorio.',
            'state.required' => 'Il campo stato è obbligatorio.'
        ];
    }
}
