class CreateContacts < ActiveRecord::Migration
  def self.up
    create_table :contacts do |t|
      t.string :name
      t.string :phone
      t.string :fax
      t.string :address
      t.string :city
      t.string :state
      t.integer :zip
      t.string :type

      t.timestamps
    end
  end

  def self.down
    drop_table :contacts
  end
end
