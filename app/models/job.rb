require 'open-uri'
class Job < ActiveRecord::Base
  belongs_to :users
  has_many :tags
  
  #on create, before save (ask will!)
  
  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :company_id, :user_id, :contact_id, :contact_email, 
    :contact_phone, :contact_fax, :contact_cell, :source, :source_link,
    :original_posting, :original_posting_scrape, :resume_id, :resume_submitted,
    :cover_letter_id, :cover_letter_submitted, :description
    
    accepts_nested_attributes_for :tags, :allow_destroy => :true,
    	:reject_if => proc { |attrs| attrs.all? {|k, v| v.blank?} }
    
  
  def scrape_url
    open(url) {
      |page| self.scrape_content = page.read()
      puts self.scrape_content
    } 
    self.processed = true
    save; self
  end
  
end
