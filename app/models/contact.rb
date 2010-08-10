class Contact < ActiveRecord::Base
	belongs_to :users
	
	attr_accessible :name, :phone, :fax, :address, :city, :state, :zip, :user_id, :category
	
end
