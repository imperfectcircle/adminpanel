<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'order_items' => $this->order_items,
            'email' => $this->email,
            'amount' => $this->amount,
            'state' => $this->state,
            'created_at' => $this->created_at->format('d-m-Y H:i'),
        ];
    }
}
