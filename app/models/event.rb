class Event < ActiveRecord::Base
	belongs_to :users
	has_many :tags
	
  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :date, :job_id, :type, :note, :user_id, :completed
	
	
    accepts_nested_attributes_for :tags, :allow_destroy => :true,
    	:reject_if => proc { |attrs| attrs.all? {|k, v| v.blank?} }
end
