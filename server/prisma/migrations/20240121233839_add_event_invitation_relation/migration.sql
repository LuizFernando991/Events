-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
