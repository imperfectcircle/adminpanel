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
            'first_name' => 'required|string|min:3',
            'last_name' => 'required|string|min:3',
            'order_items' => 'required',
            'email' => 'required|email',
            'amount' => 'required',
            'state' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'first_name.required' => 'Il campo nome è obbligatorio.',
            'first_name.string' => 'Il campo nome deve essere di tipo testo.',
            'first_name.min' => 'Il campo nome deve contenere almeno 3 caratteri.',
            'last_name.required' => 'Il campo cognome è obbligatorio.',
            'last_name.string' => 'Il campo cognome deve essere di tipo testo.',
            'last_name.min' => 'Il campo cognome deve contenere almeno 3 caratteri.',
            'order_items.requires' => 'Il campo Ordine è obbligatorio',
            'email.required' => 'Il campo email è obbligatorio.',
            'email.email' => 'Inserisci un indirizzo email valido.',
            'amount.required' => 'Il campo totale è obbligatorio.',
            'state.required' => 'Il campo stato è obbligatorio.'
        ];
    }
}
