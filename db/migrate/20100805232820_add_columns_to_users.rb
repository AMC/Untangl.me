class AddColumnsToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :name, :string
    add_column :users, :address, :string
    add_column :users, :city, :string
    add_column :users, :state, :string
    add_column :users, :zip, :integer
    add_column :users, :phone, :string
    add_column :users, :fax, :string
    add_column :users, :expires, :datetime
  end

  def self.down
    remove_column :users, :expires
    remove_column :users, :fax
    remove_column :users, :phone
    remove_column :users, :zip
    remove_column :users, :state
    remove_column :users, :city
    remove_column :users, :address
    remove_column :users, :name
  end
end
