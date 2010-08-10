class ChangeColumnTypeToCategoryInContacts < ActiveRecord::Migration
  def self.up
  	rename_column :contacts, :type, :category
  end

  def self.down
  	rename_column :contacts, :category, :type
  end
end
