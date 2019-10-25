const Recuriment = require('../../models/recruitment')
const User = require('../../models/user')

const events = async eventIds => {
    try {
      const events = await Event.find({ _id: { $in: eventIds } });
      events.map(event => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event.creator)
        };
      });
      return events;
    } catch (err) {
      throw err;
    }
  };
  
  const user = async userId => {
    try {
      const user = await User.findById(userId);
      return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this, user._doc.createdEvents)
      };
    } catch (err) {
      throw err;
    }
  };
  
  module.exports = {
    events: async () => {
      try {
        const events = await Event.find();
        return events.map(event => {
          return {
            ...event._doc,
            _id: event.id,
            date: new Date(event._doc.date).toISOString(),
            creator: user.bind(this, event._doc.creator)
          };
        });
      } catch (err) {
        throw err;
      }
    },
    createRecruitment: async args => {
        const recruitment = new Recruitment({
            user: args.recruitmentInput.user,
            position: args.recruitmentInput.position,
            status: true
        });
        let createdRecruitment;
        try {
            const result = await Recruitment.save();
            createdRecruitment = {
            ...result._doc,
            _id: result._doc._id.toString(),
            date: new Date(event._doc.date).toISOString(),
            creator: user.bind(this, result._doc.creator)
            };
            const creator = await User.findById('5c0fbd06c816781c518e4f3e');
    
            if (!creator) {
            throw new Error('User not found.');
            }
            creator.createdEvents.push(event);
            await creator.save();
    
            return createdEvent;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    createUser: async args => {
        try {
            const existingUser = await User.findOne({ username: args.userInput.username });
            if (existingUser) {
                throw new Error('User exists already.');
            }
            const user = new User({
                username: args.userInput.username,
                nicknames: args.userInput.nicknames,
                representationNickname: args.userInput.representationNickname,
                tiers: {
                    tier: args.userInput.tiers.tier,
                    rank: args.userInput.tiers.rank,
                    leaguePoint: args.userInput.tiers.leaguePoint
                },
                majorPosition: args.userInput.majorPosition,
                minorPosition: args.userInput.minorPosition,
                apiUpdateAt: args.userInput.apiUpdateAt
            });
            const result = await user.save();
    
            return { ...result._doc, _id: result.id };
        }
        catch (err) {
            throw err;
        }
    }
  };