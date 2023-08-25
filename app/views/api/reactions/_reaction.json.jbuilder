json.extract! reaction, :id, :reactable_id, :reactable_type, :reaction_type, :reactor_id
json.reactor_name "#{reaction.reactor.first_name} #{reaction.reactor.last_name}"