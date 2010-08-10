class CreateEvents < ActiveRecord::Migration
  def self.up
    create_table :events do |t|
      t.string :name
      t.datetime :date
      t.integer :job_id
      t.string :type
      t.text :note
      t.integer :user_id
      t.boolean :completed

      t.timestamps
    end
  end

  def self.down
    drop_table :events
  end
end
