class CreateTodoItems < ActiveRecord::Migration
  def self.up
    create_table :todo_items do |t|
      t.string :description
      t.boolean :complete, :default => false

      t.timestamps
    end
  end

  def self.down
    drop_table :todo_items
  end
end
