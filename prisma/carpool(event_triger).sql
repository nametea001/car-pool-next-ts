-- event

DELIMITER //

CREATE EVENT my_minute_event
ON SCHEDULE EVERY 1 MINUTE
DO
BEGIN
  -- Your SQL statements or procedures to be executed every minute
  -- For example, update the status of posts that meet the condition.
  UPDATE posts
  SET status = 'IN_PROGRESS'
  WHERE status = 'NEW' AND date_time_start <= NOW();
END;
//

DELIMITER ;

-- Triger
DELIMITER //
CREATE TRIGGER update_chat_details_on_status_change
AFTER UPDATE ON posts
FOR EACH ROW
BEGIN
    DECLARE chat_id INT;

    -- Check if the status is not 'IN_PROGRESS'
    IF NEW.status != 'IN_PROGRESS' THEN
        -- Attempt to select the chat_id from chats where post_id matches
        SELECT id INTO chat_id FROM chats WHERE post_id = NEW.id;

        -- Check if chat_id was not found
        IF chat_id IS NULL THEN
            -- Insert a new row into the chats table
            INSERT INTO chats (chat_type, send_user_id, send_post_id, created_at, created_user_id, updated_at, updated_user_id)
            VALUES ('PRIVATE', NEW.created_user_id, NULL, NOW(), NEW.created_user_id, NOW(), NEW.updated_user_id);

            -- Get the newly generated chat_id
            SET chat_id = LAST_INSERT_ID();
        END IF;

        -- Insert into chat_details with chat_id
        INSERT INTO chat_details (chat_id, msg_type, msg, lat_lng, created_at, created_user_id, updated_at, updated_user_id)
        VALUES (chat_id, 'MSG', 'Initial message', NULL, NOW(), NEW.created_user_id, NOW(), NEW.updated_user_id);
    END IF;
END;
//
DELIMITER ;
