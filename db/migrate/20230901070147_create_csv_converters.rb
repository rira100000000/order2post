class CreateCsvConverters < ActiveRecord::Migration[7.0]
  def change
    create_table :conversions do |t|
      t.integer :user_id, foreign_key: true, unique: true
      t.string :item, unique: true, null: false
      t.string :content, null: false
      t.timestamps
    end

    add_foreign_key :conversions, :users, on_delete: :cascade
  end
end
