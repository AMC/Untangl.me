class User < ActiveRecord::Base
  has_many :jobs
  has_many :contacts
  
  # Include default devise modules. Others available are:
  # :token_authenticatable, :lockable, :confirmable, and :timeoutable
  devise :database_authenticatable, :registerable, 
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :role, :name, :address, :city, :state, :zip, :phone, :fax
  # Add more accessible items if additional columns are used such as phone, address, etc
   
  ROLES = %w[admin csr trial member guest]
end
