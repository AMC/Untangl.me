class ScrapeWebsiteJob < Struct.new(:job_id)
  def perform
    @job = Job.find(job_id)
    @job.scrape_url
    puts @job.scrape_content
  end    
end