class CreateConverteds < ActiveRecord::Migration[7.0]
  def change
    create_table :converteds do |t|
      t.string :order_id, null: false, unique: true
      t.timestamps
    end
  end
end
