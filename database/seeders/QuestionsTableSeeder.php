<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('questions')->insert([
            [
                'question' => 'What is the capital of France?',
                'answer_1' => 'Berlin',
                'answer_2' => 'Madrid',
                'answer_3' => 'Paris',
                'correct_answer' => 3
            ],
            [
                'question' => 'What is the largest planet in our solar system?',
                'answer_1' => 'Earth',
                'answer_2' => 'Jupiter',
                'answer_3' => 'Mars',
                'correct_answer' => 2
            ],
            [
                'question' => 'What is the chemical symbol for water?',
                'answer_1' => 'H2O',
                'answer_2' => 'O2',
                'answer_3' => 'CO2',
                'correct_answer' => 1
            ],
            // Add more questions as needed
        ]);
    }
}
