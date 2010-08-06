class AddColumnsToJobs < ActiveRecord::Migration
  def self.up
    add_column :jobs, :company_id, :string
    add_column :jobs, :user_id, :string
    add_column :jobs, :contact_email, :string
    add_column :jobs, :contact_phone, :string
    add_column :jobs, :contact_fax, :string
    add_column :jobs, :contact_cell, :string
    add_column :jobs, :source, :string
    add_column :jobs, :source_link, :string
    add_column :jobs, :original_posting, :string
    add_column :jobs, :original_posting_scrape, :text
    add_column :jobs, :resume_id, :integer
    add_column :jobs, :resume_submitted, :boolean
    add_column :jobs, :cover_letter_id, :integer
    add_column :jobs, :cover_letter_submitted, :boolean
  end

  def self.down
    remove_column :jobs, :cover_letter_submitted
    remove_column :jobs, :cover_letter_id
    remove_column :jobs, :resume_submitted
    remove_column :jobs, :resume_id
    remove_column :jobs, :original_posting_scrape
    remove_column :jobs, :original_posting
    remove_column :jobs, :source_link
    remove_column :jobs, :source
    remove_column :jobs, :contact_cell
    remove_column :jobs, :contact_fax
    remove_column :jobs, :contact_phone
    remove_column :jobs, :contact_email
    remove_column :jobs, :user_id
    remove_column :jobs, :company_id
  end
end
