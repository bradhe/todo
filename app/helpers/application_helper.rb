module ApplicationHelper
  def mobile?
    iphone? || android?
  end

  def iphone?
    request.user_agent.include?("iPhone")
  end

  def android?
    request.user_agent.include?("Android")
  end

  def include_appcache?
    !!appcache
  end

  def appcache(name=nil)
    @appcache ||= name if name
    @appcache
  end
end
