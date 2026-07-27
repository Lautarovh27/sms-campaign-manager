import Contact from "./Contact.js";
import Campaign from "./Campaign.js";

Campaign.belongsToMany(Contact, {
    through: "campaign_contacts",
    foreignKey: "campaignId",
});

Contact.belongsToMany(Campaign, {
    through: "campaign_contacts",
    foreignKey: "contactId",
});

export {
    Contact,
    Campaign
};