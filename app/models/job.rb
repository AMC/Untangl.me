require 'open-uri'
class Job < ActiveRecord::Base
  
  def scrape_url
    open(url) {
      |page| self.scrape_content = page.read()
      puts self.scrape_content
    } 
    self.processed = true
    save; self
  end
  
end
