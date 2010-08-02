class AddUrlAndScrapeContentAndProcessedToJob < ActiveRecord::Migration
  def self.up
    add_column :jobs, :url, :string
    add_column :jobs, :scrape_content, :text
    add_column :jobs, :processed, :boolean, :default => false
  end

  def self.down
    remove_column :jobs, :processed
    remove_column :jobs, :scrape_content
    remove_column :jobs, :url
  end
end
