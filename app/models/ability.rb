class Ability
  include CanCan::Ability

  def initialize(user)
    if user.role == 'admin'
      can :manage, :all
    elsif user.role == 'member'
      can :read, :all
    else
      can :read, :all
    end
  end

end
