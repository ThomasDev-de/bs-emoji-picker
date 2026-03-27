(function ($) {
    'use strict';

    if (!$) {
        throw new Error('bsEmojiPicker requires jQuery.');
    }

    const DATA_KEY = 'bsEmojiPicker';
    const LISTENER_CLASS = 'bs-emoji-picker-listener';
    const WRAPPER_CLASS = 'bs-emoji-picker';
    const DROPDOWN_CLASS = 'dropdown-emoji';

    $.bsEmojiPicker = {
        version: '2.0.0',

        defaults: {
            btnClass: 'btn btn-outline-secondary',
            btnText: '<i class="bi bi-emoji-smile"></i>',
            btnIconClass: 'bi bi-emoji-smile',
            btnShowToggle: false,
            targetInput: null,
            labels: {
                classics: 'Classics',
                slackDiscordFaces: 'Slack/Discord Faces',
                heartsAndLove: 'Hearts & Love',
                handsAndGestures: 'Hands & Gestures',
                symbolsAndObjects: 'Symbols & Objects',
                animalsAndNature: 'Animals & Nature',
                foodAndDrink: 'Food & Drink',
                activitiesAndSports: 'Activities & Sports',
                travelAndPlaces: 'Travel & Places',
                weatherAndNatureExtras: 'Weather & Nature',
                plantsAndFlowers: 'Plants & Flowers',
                techAndObjectsExtra: 'Tech & Objects',
                uiSymbolsExtra: 'UI Symbols',
                communicationAndMedia: 'Communication & Media',
                peopleAndEmotionsExtra: 'People & Emotions',
                flagsBasic: 'Flags'
            },
            onClickEmoji(emoji) {
                return emoji;
            }
        },

        asciiMap: [
            { re: /<\/3/g, emoji: '💔' },
            { re: /<3/g, emoji: '❤️' },
            { re: /:'-D|:'D/gi, emoji: '😂' },
            { re: /:-D|:D|=D|xD|XD/gi, emoji: '😁' },
            { re: /:-\)|:\)|=\)|:\]|\=\]|:\^\)|\(=:|\(-:/g, emoji: '🙂' },
            { re: /:-\(|:\(|=\(|:\[|=\[/g, emoji: '🙁' },
            { re: /D:/g, emoji: '😧' },
            { re: /:-O|:O|:-o|:o/gi, emoji: '😮' },
            { re: /:-\*|:\*/g, emoji: '😘' },
            { re: /\^_\^/g, emoji: '😊' },
            { re: /;-?\)|;-?D/g, emoji: '😉' },
            { re: /:-P|:P|=-P|=-p|:p/gi, emoji: '😛' },
            { re: /:-S|:S/gi, emoji: '😖' },
            { re: /:-\||:\|/g, emoji: '😐' },
            { re: />:-\(|>:\(/g, emoji: '😠' },
            { re: />:-\)|>:\)/g, emoji: '😈' },
            { re: /O:-\)|0:-\)/g, emoji: '😇' },
            { re: /-_-|\.__\./g, emoji: '😴' },
            { re: /:'-\(|:'\(/g, emoji: '😢' },
            { re: /T_T|;_;|QQ/g, emoji: '😭' },
            { re: /:-X|:X/gi, emoji: '🤐' },
            { re: /:-\$|:\$/g, emoji: '😳' },
            { re: /¯\\_\(ツ\)_\/¯/g, emoji: '🤷' },
            { re: /:-\?|\?_o/gi, emoji: '🤔' },
            { re: /B-?\)|b-?\)/g, emoji: '😎' }
        ],

        emojiData: {
            heartsAndLove: [
                { emoji: '❤️', shortcodes: ['heart', 'red_heart'] },
                { emoji: '💖', shortcodes: ['sparkling_heart'] },
                { emoji: '💕', shortcodes: ['two_hearts'] },
                { emoji: '💞', shortcodes: ['revolving_hearts'] },
                { emoji: '💓', shortcodes: ['heartbeat'] },
                { emoji: '💗', shortcodes: ['heartpulse'] },
                { emoji: '💘', shortcodes: ['cupid'] },
                { emoji: '💝', shortcodes: ['gift_heart'] },
                { emoji: '💟', shortcodes: ['heart_decoration'] },
                { emoji: '💙', shortcodes: ['blue_heart'] },
                { emoji: '💚', shortcodes: ['green_heart'] },
                { emoji: '💛', shortcodes: ['yellow_heart'] },
                { emoji: '💜', shortcodes: ['purple_heart'] },
                { emoji: '🖤', shortcodes: ['black_heart'] },
                { emoji: '🤍', shortcodes: ['white_heart'] },
                { emoji: '🧡', shortcodes: ['orange_heart'] },
                { emoji: '🤎', shortcodes: ['brown_heart'] },
                { emoji: '🩷', shortcodes: ['pink_heart'] },
                { emoji: '🩵', shortcodes: ['light_blue_heart'] },
                { emoji: '🩶', shortcodes: ['grey_heart', 'gray_heart'] },
                { emoji: '❤️‍🔥', shortcodes: ['heart_on_fire'] },
                { emoji: '❤️‍🩹', shortcodes: ['mending_heart'] },
                { emoji: '💌', shortcodes: ['love_letter'] },
                { emoji: '💋', shortcodes: ['kiss'] }
            ],

            classics: [
                { emoji: '😁', shortcodes: ['grin'] },
                { emoji: '😂', shortcodes: ['joy'] },
                { emoji: '🙂', shortcodes: ['slightly_smiling_face'] },
                { emoji: '🙁', shortcodes: ['slightly_frowning_face'] },
                { emoji: '😮', shortcodes: ['open_mouth'] },
                { emoji: '😘', shortcodes: ['kissing_heart'] },
                { emoji: '😊', shortcodes: ['blush'] },
                { emoji: '😉', shortcodes: ['wink'] },
                { emoji: '😛', shortcodes: ['stuck_out_tongue'] },
                { emoji: '😖', shortcodes: ['confounded'] },
                { emoji: '😐', shortcodes: ['neutral_face'] },
                { emoji: '😠', shortcodes: ['angry'] },
                { emoji: '😈', shortcodes: ['smiling_imp'] },
                { emoji: '😇', shortcodes: ['innocent'] },
                { emoji: '😴', shortcodes: ['sleeping'] },
                { emoji: '😢', shortcodes: ['cry'] },
                { emoji: '😭', shortcodes: ['sob'] },
                { emoji: '🤐', shortcodes: ['zipper_mouth_face'] },
                { emoji: '😳', shortcodes: ['flushed'] },
                { emoji: '🤷', shortcodes: ['shrug'] },
                { emoji: '🤦', shortcodes: ['facepalm'] },
                { emoji: '🤔', shortcodes: ['thinking'] },
                { emoji: '😎', shortcodes: ['sunglasses'] }
            ],

            slackDiscordFaces: [
                { emoji: '😄', shortcodes: ['smile'] },
                { emoji: '😃', shortcodes: ['smiley'] },
                { emoji: '😀', shortcodes: ['grinning'] },
                { emoji: '😁', shortcodes: ['grin', 'beaming_face_with_smiling_eyes'] },
                { emoji: '😂', shortcodes: ['joy'] },
                { emoji: '🤣', shortcodes: ['rofl'] },
                { emoji: '😉', shortcodes: ['wink'] },
                { emoji: '😊', shortcodes: ['blush'] },
                { emoji: '😇', shortcodes: ['innocent'] },
                { emoji: '🙂', shortcodes: ['slightly_smiling_face'] },
                { emoji: '🙃', shortcodes: ['upside_down_face'] },
                { emoji: '🫠', shortcodes: ['melting_face'] },
                { emoji: '😍', shortcodes: ['heart_eyes'] },
                { emoji: '🤩', shortcodes: ['star_struck'] },
                { emoji: '😘', shortcodes: ['kissing_heart'] },
                { emoji: '🤔', shortcodes: ['thinking_face'] },
                { emoji: '🫡', shortcodes: ['saluting_face'] },
                { emoji: '😐', shortcodes: ['neutral_face'] },
                { emoji: '😑', shortcodes: ['expressionless'] },
                { emoji: '😶', shortcodes: ['no_mouth'] },
                { emoji: '🫥', shortcodes: ['dotted_line_face'] },
                { emoji: '🙄', shortcodes: ['rolling_eyes'] },
                { emoji: '😏', shortcodes: ['smirk'] },
                { emoji: '😣', shortcodes: ['persevere'] },
                { emoji: '😞', shortcodes: ['disappointed'] },
                { emoji: '😟', shortcodes: ['worried'] },
                { emoji: '😕', shortcodes: ['confused'] },
                { emoji: '☹️', shortcodes: ['frowning'] },
                { emoji: '🙁', shortcodes: ['slightly_frowning_face'] },
                { emoji: '😮', shortcodes: ['open_mouth'] },
                { emoji: '😯', shortcodes: ['hushed'] },
                { emoji: '😲', shortcodes: ['astonished'] },
                { emoji: '😳', shortcodes: ['flushed'] },
                { emoji: '🥺', shortcodes: ['pleading_face'] },
                { emoji: '😢', shortcodes: ['cry'] },
                { emoji: '😭', shortcodes: ['sob'] },
                { emoji: '😠', shortcodes: ['angry'] },
                { emoji: '😡', shortcodes: ['rage'] },
                { emoji: '🤬', shortcodes: ['face_with_symbols_on_mouth'] },
                { emoji: '🤯', shortcodes: ['exploding_head', 'mindblown'] },
                { emoji: '😎', shortcodes: ['sunglasses'] },
                { emoji: '🥳', shortcodes: ['partying_face'] },
                { emoji: '😴', shortcodes: ['sleeping'] },
                { emoji: '🤤', shortcodes: ['drooling_face'] },
                { emoji: '🥴', shortcodes: ['woozy_face'] },
                { emoji: '😵‍💫', shortcodes: ['face_with_spiral_eyes'] },
                { emoji: '😬', shortcodes: ['grimacing'] },
                { emoji: '🤐', shortcodes: ['zipper_mouth_face'] }
            ],

            handsAndGestures: [
                { emoji: '👍', shortcodes: ['thumbsup', '+1', 'like'] },
                { emoji: '👎', shortcodes: ['thumbsdown', '-1'] },
                { emoji: '👏', shortcodes: ['clap'] },
                { emoji: '🙏', shortcodes: ['pray', 'folded_hands'] },
                { emoji: '👋', shortcodes: ['wave', 'waving_hand'] },
                { emoji: '🤚', shortcodes: ['raised_back_of_hand'] },
                { emoji: '🤝', shortcodes: ['handshake'] },
                { emoji: '👌', shortcodes: ['ok_hand', 'ok'] },
                { emoji: '🤌', shortcodes: ['pinched_fingers'] },
                { emoji: '🤏', shortcodes: ['pinching_hand'] },
                { emoji: '💪', shortcodes: ['muscle'] },
                { emoji: '🦾', shortcodes: ['mechanical_arm'] },
                { emoji: '🤞', shortcodes: ['fingers_crossed', 'crossed_fingers'] },
                { emoji: '🤟', shortcodes: ['love_you_gesture'] },
                { emoji: '🤘', shortcodes: ['metal', 'sign_of_the_horns'] },
                { emoji: '✌️', shortcodes: ['v', 'victory_hand'] },
                { emoji: '🤙', shortcodes: ['call_me', 'call_me_hand'] },
                { emoji: '✋', shortcodes: ['raised_hand', 'hand'] },
                { emoji: '☝️', shortcodes: ['point_up'] },
                { emoji: '👇', shortcodes: ['point_down'] },
                { emoji: '👈', shortcodes: ['point_left'] },
                { emoji: '👉', shortcodes: ['point_right'] },
                { emoji: '✊', shortcodes: ['fist'] },
                { emoji: '👊', shortcodes: ['oncoming_fist'] },
                { emoji: '🤛', shortcodes: ['left_facing_fist'] },
                { emoji: '🤜', shortcodes: ['right_facing_fist'] },
                { emoji: '🙌', shortcodes: ['raised_hands'] },
                { emoji: '👐', shortcodes: ['open_hands'] },
                { emoji: '🤲', shortcodes: ['palms_up_together'] },
                { emoji: '✍️', shortcodes: ['writing_hand'] },
                { emoji: '💅', shortcodes: ['nail_care'] },
                { emoji: '🤳', shortcodes: ['selfie'] }
            ],

            peopleAndEmotionsExtra: [
                { emoji: '🥰', shortcodes: ['smiling_face_with_3_hearts'] },
                { emoji: '😘', shortcodes: ['face_blowing_a_kiss'] },
                { emoji: '🤗', shortcodes: ['hugging_face'] },
                { emoji: '🤭', shortcodes: ['face_with_hand_over_mouth'] },
                { emoji: '🫢', shortcodes: ['face_with_open_eyes_and_hand_over_mouth'] },
                { emoji: '🫣', shortcodes: ['face_with_peeking_eye'] },
                { emoji: '🤫', shortcodes: ['shushing_face'] },
                { emoji: '🤥', shortcodes: ['lying_face'] },
                { emoji: '😌', shortcodes: ['relieved'] },
                { emoji: '😔', shortcodes: ['pensive'] },
                { emoji: '😪', shortcodes: ['sleepy'] },
                { emoji: '🥱', shortcodes: ['yawning_face'] },
                { emoji: '😷', shortcodes: ['mask'] },
                { emoji: '🤒', shortcodes: ['face_with_thermometer'] },
                { emoji: '🤕', shortcodes: ['face_with_head_bandage'] },
                { emoji: '🤢', shortcodes: ['nauseated_face'] },
                { emoji: '🤮', shortcodes: ['vomiting_face'] },
                { emoji: '🤧', shortcodes: ['sneezing_face'] },
                { emoji: '🥵', shortcodes: ['hot_face'] },
                { emoji: '🥶', shortcodes: ['cold_face'] },
                { emoji: '🤠', shortcodes: ['cowboy_hat_face'] },
                { emoji: '🥸', shortcodes: ['disguised_face'] },
                { emoji: '🤓', shortcodes: ['nerd_face'] },
                { emoji: '🧐', shortcodes: ['monocle_face'] },
                { emoji: '🤖', shortcodes: ['robot'] },
                { emoji: '👻', shortcodes: ['ghost'] },
                { emoji: '💀', shortcodes: ['skull'] },
                { emoji: '☠️', shortcodes: ['skull_and_crossbones'] },
                { emoji: '👽', shortcodes: ['alien'] },
                { emoji: '👾', shortcodes: ['space_invader'] },
                { emoji: '💩', shortcodes: ['poop', 'shit', 'pile_of_poo'] },
                { emoji: '🤡', shortcodes: ['clown_face'] },
                { emoji: '👹', shortcodes: ['ogre'] },
                { emoji: '👺', shortcodes: ['goblin'] },
                { emoji: '🙈', shortcodes: ['see_no_evil'] },
                { emoji: '🙉', shortcodes: ['hear_no_evil'] },
                { emoji: '🙊', shortcodes: ['speak_no_evil'] },
                { emoji: '🥷', shortcodes: ['ninja'] },
                { emoji: '🕵️', shortcodes: ['detective'] },
                { emoji: '🧙', shortcodes: ['mage'] },
                { emoji: '🧚', shortcodes: ['fairy'] },
                { emoji: '🧛', shortcodes: ['vampire'] },
                { emoji: '🧟', shortcodes: ['zombie'] },
                { emoji: '🧜', shortcodes: ['merperson'] },
                { emoji: '🧝', shortcodes: ['elf'] },
                { emoji: '🧞', shortcodes: ['genie'] }
            ],

            symbolsAndObjects: [
                { emoji: '⭐', shortcodes: ['star'] },
                { emoji: '🌟', shortcodes: ['star2'] },
                { emoji: '✨', shortcodes: ['sparkles'] },
                { emoji: '💫', shortcodes: ['dizzy'] },
                { emoji: '🔥', shortcodes: ['fire'] },
                { emoji: '💥', shortcodes: ['boom', 'collision'] },
                { emoji: '💢', shortcodes: ['anger'] },
                { emoji: '💦', shortcodes: ['sweat_drops'] },
                { emoji: '💨', shortcodes: ['dash'] },
                { emoji: '🕳️', shortcodes: ['hole'] },
                { emoji: '🎉', shortcodes: ['tada'] },
                { emoji: '🎊', shortcodes: ['confetti_ball'] },
                { emoji: '🚀', shortcodes: ['rocket'] },
                { emoji: '🛸', shortcodes: ['flying_saucer'] },
                { emoji: '👀', shortcodes: ['eyes'] },
                { emoji: '👁️', shortcodes: ['eye'] },
                { emoji: '💯', shortcodes: ['100'] },
                { emoji: '✅', shortcodes: ['check', 'white_check_mark'] },
                { emoji: '✔️', shortcodes: ['heavy_check_mark'] },
                { emoji: '❌', shortcodes: ['x', 'cross_mark'] },
                { emoji: '💡', shortcodes: ['bulb', 'idea'] },
                { emoji: '⚠️', shortcodes: ['warning'] },
                { emoji: '❓', shortcodes: ['question'] },
                { emoji: '❔', shortcodes: ['grey_question', 'gray_question'] },
                { emoji: '❗', shortcodes: ['exclamation'] },
                { emoji: '❕', shortcodes: ['grey_exclamation', 'gray_exclamation'] },
                { emoji: '‼️', shortcodes: ['bangbang'] },
                { emoji: '⁉️', shortcodes: ['interrobang'] },
                { emoji: '🎁', shortcodes: ['gift'] },
                { emoji: '🔗', shortcodes: ['link'] },
                { emoji: '📎', shortcodes: ['paperclip'] },
                { emoji: '📅', shortcodes: ['calendar'] },
                { emoji: '📆', shortcodes: ['date'] },
                { emoji: '⏰', shortcodes: ['alarm_clock'] },
                { emoji: '☎️', shortcodes: ['phone', 'telephone'] },
                { emoji: '📞', shortcodes: ['telephone_receiver'] },
                { emoji: '📱', shortcodes: ['mobile', 'smartphone', 'mobile_phone'] },
                { emoji: '💻', shortcodes: ['laptop'] },
                { emoji: '🖥️', shortcodes: ['desktop', 'computer'] },
                { emoji: '🖨️', shortcodes: ['printer'] },
                { emoji: '⌨️', shortcodes: ['keyboard'] },
                { emoji: '🔋', shortcodes: ['battery'] },
                { emoji: '🪫', shortcodes: ['low_battery'] },
                { emoji: '🔌', shortcodes: ['plug'] },
                { emoji: '✉️', shortcodes: ['email', 'envelope'] },
                { emoji: '📨', shortcodes: ['incoming_envelope'] },
                { emoji: '📦', shortcodes: ['package'] },
                { emoji: '🛒', shortcodes: ['shopping_cart'] },
                { emoji: '🛍️', shortcodes: ['shopping_bags'] },
                { emoji: '💰', shortcodes: ['moneybag'] },
                { emoji: '🪙', shortcodes: ['coin'] },
                { emoji: '💳', shortcodes: ['credit_card'] },
                { emoji: '🧾', shortcodes: ['receipt'] },
                { emoji: '📈', shortcodes: ['chart_increasing'] },
                { emoji: '📉', shortcodes: ['chart_decreasing'] },
                { emoji: '📊', shortcodes: ['bar_chart'] },
                { emoji: '🔒', shortcodes: ['lock'] },
                { emoji: '🔓', shortcodes: ['unlock'] },
                { emoji: '🔑', shortcodes: ['key'] },
                { emoji: '🗝️', shortcodes: ['old_key'] },
                { emoji: '🔨', shortcodes: ['hammer'] },
                { emoji: '🪓', shortcodes: ['axe'] },
                { emoji: '⛏️', shortcodes: ['pick'] },
                { emoji: '🔧', shortcodes: ['wrench'] },
                { emoji: '🔩', shortcodes: ['nut_and_bolt'] },
                { emoji: '⚙️', shortcodes: ['gear'] },
                { emoji: '🧰', shortcodes: ['toolbox'] },
                { emoji: '🧲', shortcodes: ['magnet'] },
                { emoji: '📷', shortcodes: ['camera'] },
                { emoji: '📸', shortcodes: ['camera_flash'] },
                { emoji: '📹', shortcodes: ['video_camera'] },
                { emoji: '🎥', shortcodes: ['movie_camera'] },
                { emoji: '🎧', shortcodes: ['headphones'] },
                { emoji: '🎤', shortcodes: ['microphone', 'mic'] },
                { emoji: '🎙️', shortcodes: ['studio_microphone'] },
                { emoji: '🔈', shortcodes: ['speaker'] },
                { emoji: '🔊', shortcodes: ['loud_sound'] },
                { emoji: '🔇', shortcodes: ['mute'] },
                { emoji: '🔔', shortcodes: ['bell'] },
                { emoji: '🔕', shortcodes: ['bell_with_slash'] },
                { emoji: '📖', shortcodes: ['book'] },
                { emoji: '📚', shortcodes: ['books'] },
                { emoji: '📓', shortcodes: ['notebook'] },
                { emoji: '📔', shortcodes: ['notebook_with_decorative_cover'] },
                { emoji: '📒', shortcodes: ['ledger'] },
                { emoji: '📋', shortcodes: ['clipboard'] },
                { emoji: '✏️', shortcodes: ['pencil'] },
                { emoji: '🖊️', shortcodes: ['pen'] },
                { emoji: '🖋️', shortcodes: ['fountain_pen'] },
                { emoji: '🖌️', shortcodes: ['paintbrush'] },
                { emoji: '🖍️', shortcodes: ['crayon'] },
                { emoji: '✂️', shortcodes: ['scissors'] },
                { emoji: '🗑️', shortcodes: ['trash', 'wastebasket'] },
                { emoji: '📁', shortcodes: ['folder'] },
                { emoji: '📂', shortcodes: ['open_file_folder'] },
                { emoji: '📄', shortcodes: ['file', 'page_facing_up'] },
                { emoji: '📰', shortcodes: ['newspaper'] },
                { emoji: '📜', shortcodes: ['scroll'] },
                { emoji: '🌐', shortcodes: ['globe', 'globe_with_meridians'] },
                { emoji: '🗺️', shortcodes: ['map'] },
                { emoji: '🧭', shortcodes: ['compass'] },
                { emoji: '📍', shortcodes: ['pin', 'round_pushpin'] },
                { emoji: '📌', shortcodes: ['pushpin'] }
            ],

            animalsAndNature: [
                { emoji: '🐱', shortcodes: ['cat'] },
                { emoji: '🐶', shortcodes: ['dog'] },
                { emoji: '🐭', shortcodes: ['mouse'] },
                { emoji: '🐹', shortcodes: ['hamster'] },
                { emoji: '🐰', shortcodes: ['rabbit'] },
                { emoji: '🦊', shortcodes: ['fox'] },
                { emoji: '🐻', shortcodes: ['bear'] },
                { emoji: '🐻‍❄️', shortcodes: ['polar_bear'] },
                { emoji: '🐨', shortcodes: ['koala'] },
                { emoji: '🐼', shortcodes: ['panda'] },
                { emoji: '🦥', shortcodes: ['sloth'] },
                { emoji: '🦦', shortcodes: ['otter'] },
                { emoji: '🐯', shortcodes: ['tiger'] },
                { emoji: '🦁', shortcodes: ['lion'] },
                { emoji: '🐮', shortcodes: ['cow'] },
                { emoji: '🐷', shortcodes: ['pig'] },
                { emoji: '🐗', shortcodes: ['boar'] },
                { emoji: '🐒', shortcodes: ['monkey'] },
                { emoji: '🦍', shortcodes: ['gorilla'] },
                { emoji: '🦧', shortcodes: ['orangutan'] },
                { emoji: '🐔', shortcodes: ['chicken'] },
                { emoji: '🐦', shortcodes: ['bird'] },
                { emoji: '🐤', shortcodes: ['baby_chick'] },
                { emoji: '🐧', shortcodes: ['penguin'] },
                { emoji: '🦆', shortcodes: ['duck'] },
                { emoji: '🦅', shortcodes: ['eagle'] },
                { emoji: '🦉', shortcodes: ['owl'] },
                { emoji: '🦩', shortcodes: ['flamingo'] },
                { emoji: '🦚', shortcodes: ['peacock'] },
                { emoji: '🦜', shortcodes: ['parrot'] },
                { emoji: '🐸', shortcodes: ['frog'] },
                { emoji: '🐊', shortcodes: ['crocodile'] },
                { emoji: '🐢', shortcodes: ['turtle'] },
                { emoji: '🦎', shortcodes: ['lizard'] },
                { emoji: '🐍', shortcodes: ['snake'] },
                { emoji: '🐉', shortcodes: ['dragon'] },
                { emoji: '🦕', shortcodes: ['sauropod'] },
                { emoji: '🦖', shortcodes: ['t_rex'] },
                { emoji: '🐋', shortcodes: ['whale'] },
                { emoji: '🐬', shortcodes: ['dolphin'] },
                { emoji: '🦭', shortcodes: ['seal'] },
                { emoji: '🐟', shortcodes: ['fish'] },
                { emoji: '🐠', shortcodes: ['tropical_fish'] },
                { emoji: '🐡', shortcodes: ['blowfish'] },
                { emoji: '🦈', shortcodes: ['shark'] },
                { emoji: '🐙', shortcodes: ['octopus'] },
                { emoji: '🦑', shortcodes: ['squid'] },
                { emoji: '🦀', shortcodes: ['crab'] },
                { emoji: '🦞', shortcodes: ['lobster'] },
                { emoji: '🦐', shortcodes: ['shrimp'] },
                { emoji: '🐌', shortcodes: ['snail'] },
                { emoji: '🦋', shortcodes: ['butterfly'] },
                { emoji: '🐝', shortcodes: ['bee', 'honeybee'] },
                { emoji: '🐛', shortcodes: ['bug'] },
                { emoji: '🪲', shortcodes: ['beetle'] },
                { emoji: '🐞', shortcodes: ['lady_beetle'] },
                { emoji: '🐜', shortcodes: ['ant'] },
                { emoji: '🦟', shortcodes: ['mosquito'] },
                { emoji: '🪰', shortcodes: ['fly'] },
                { emoji: '🪱', shortcodes: ['worm'] },
                { emoji: '🕷️', shortcodes: ['spider'] },
                { emoji: '🦂', shortcodes: ['scorpion'] },
                { emoji: '🐾', shortcodes: ['paw_print', 'paw_prints'] }
            ],

            plantsAndFlowers: [
                { emoji: '🌹', shortcodes: ['rose'] },
                { emoji: '🥀', shortcodes: ['wilted_flower'] },
                { emoji: '🌷', shortcodes: ['tulip'] },
                { emoji: '🌻', shortcodes: ['sunflower'] },
                { emoji: '🌸', shortcodes: ['cherry_blossom'] },
                { emoji: '🌺', shortcodes: ['hibiscus'] },
                { emoji: '🌼', shortcodes: ['blossom'] },
                { emoji: '🪷', shortcodes: ['lotus'] },
                { emoji: '💐', shortcodes: ['bouquet'] },
                { emoji: '🌱', shortcodes: ['seedling'] },
                { emoji: '🪴', shortcodes: ['potted_plant'] },
                { emoji: '🌿', shortcodes: ['herb'] },
                { emoji: '☘️', shortcodes: ['shamrock'] },
                { emoji: '🌳', shortcodes: ['deciduous_tree'] },
                { emoji: '🌲', shortcodes: ['evergreen_tree'] },
                { emoji: '🌴', shortcodes: ['palm_tree'] },
                { emoji: '🌵', shortcodes: ['cactus'] },
                { emoji: '🎋', shortcodes: ['tanabata_tree'] },
                { emoji: '🍀', shortcodes: ['four_leaf_clover'] },
                { emoji: '🍁', shortcodes: ['maple_leaf'] },
                { emoji: '🍂', shortcodes: ['fallen_leaf'] },
                { emoji: '🍃', shortcodes: ['leaf_fluttering_in_wind'] },
                { emoji: '🍄', shortcodes: ['mushroom'] }
            ],

            foodAndDrink: [
                { emoji: '🍕', shortcodes: ['pizza'] },
                { emoji: '🍔', shortcodes: ['burger', 'hamburger'] },
                { emoji: '🍟', shortcodes: ['fries'] },
                { emoji: '🌭', shortcodes: ['hotdog'] },
                { emoji: '🥪', shortcodes: ['sandwich'] },
                { emoji: '🌮', shortcodes: ['taco'] },
                { emoji: '🌯', shortcodes: ['burrito'] },
                { emoji: '🧆', shortcodes: ['falafel'] },
                { emoji: '🍣', shortcodes: ['sushi'] },
                { emoji: '🍜', shortcodes: ['ramen'] },
                { emoji: '🍝', shortcodes: ['spaghetti'] },
                { emoji: '🥗', shortcodes: ['salad', 'green_salad'] },
                { emoji: '🍿', shortcodes: ['popcorn'] },
                { emoji: '🍎', shortcodes: ['apple'] },
                { emoji: '🍏', shortcodes: ['green_apple'] },
                { emoji: '🍐', shortcodes: ['pear'] },
                { emoji: '🍌', shortcodes: ['banana'] },
                { emoji: '🍉', shortcodes: ['watermelon'] },
                { emoji: '🍇', shortcodes: ['grapes'] },
                { emoji: '🍓', shortcodes: ['strawberry'] },
                { emoji: '🫐', shortcodes: ['blueberries'] },
                { emoji: '🍈', shortcodes: ['melon'] },
                { emoji: '🍒', shortcodes: ['cherries'] },
                { emoji: '🍑', shortcodes: ['peach'] },
                { emoji: '🍍', shortcodes: ['pineapple'] },
                { emoji: '🥭', shortcodes: ['mango'] },
                { emoji: '🥥', shortcodes: ['coconut'] },
                { emoji: '🥝', shortcodes: ['kiwi_fruit'] },
                { emoji: '🍅', shortcodes: ['tomato'] },
                { emoji: '🍆', shortcodes: ['eggplant'] },
                { emoji: '🥑', shortcodes: ['avocado'] },
                { emoji: '🥦', shortcodes: ['broccoli'] },
                { emoji: '🥕', shortcodes: ['carrot'] },
                { emoji: '🌽', shortcodes: ['corn'] },
                { emoji: '🌶️', shortcodes: ['pepper'] },
                { emoji: '🫒', shortcodes: ['olive'] },
                { emoji: '🧄', shortcodes: ['garlic'] },
                { emoji: '🧅', shortcodes: ['onion'] },
                { emoji: '🍞', shortcodes: ['bread'] },
                { emoji: '🥐', shortcodes: ['croissant'] },
                { emoji: '🥖', shortcodes: ['baguette_bread'] },
                { emoji: '🥨', shortcodes: ['pretzel'] },
                { emoji: '🧀', shortcodes: ['cheese'] },
                { emoji: '🥚', shortcodes: ['egg'] },
                { emoji: '🥓', shortcodes: ['bacon'] },
                { emoji: '🥞', shortcodes: ['pancakes'] },
                { emoji: '🧇', shortcodes: ['waffle'] },
                { emoji: '🎂', shortcodes: ['cake', 'birthday'] },
                { emoji: '🧁', shortcodes: ['cupcake'] },
                { emoji: '🍪', shortcodes: ['cookie'] },
                { emoji: '🍩', shortcodes: ['doughnut'] },
                { emoji: '🍫', shortcodes: ['chocolate_bar'] },
                { emoji: '🍬', shortcodes: ['candy'] },
                { emoji: '🍭', shortcodes: ['lollipop'] },
                { emoji: '🍮', shortcodes: ['custard'] },
                { emoji: '🍦', shortcodes: ['icecream'] },
                { emoji: '🍨', shortcodes: ['ice_cream'] },
                { emoji: '☕', shortcodes: ['coffee'] },
                { emoji: '🍵', shortcodes: ['tea'] },
                { emoji: '🧋', shortcodes: ['bubble_tea'] },
                { emoji: '🥛', shortcodes: ['milk'] },
                { emoji: '🍹', shortcodes: ['tropical_drink'] },
                { emoji: '🍸', shortcodes: ['cocktail'] },
                { emoji: '🍷', shortcodes: ['wine', 'wine_glass'] },
                { emoji: '🍺', shortcodes: ['beer'] },
                { emoji: '🍻', shortcodes: ['beers'] },
                { emoji: '🥂', shortcodes: ['clinking_glasses'] }
            ],

            activitiesAndSports: [
                { emoji: '⚽', shortcodes: ['soccer'] },
                { emoji: '🏀', shortcodes: ['basketball'] },
                { emoji: '🎾', shortcodes: ['tennis'] },
                { emoji: '🏈', shortcodes: ['football'] },
                { emoji: '⚾', shortcodes: ['baseball'] },
                { emoji: '🥎', shortcodes: ['softball'] },
                { emoji: '🏐', shortcodes: ['volleyball'] },
                { emoji: '🏉', shortcodes: ['rugby_football'] },
                { emoji: '⛳', shortcodes: ['golf'] },
                { emoji: '🏓', shortcodes: ['ping_pong'] },
                { emoji: '🏸', shortcodes: ['badminton'] },
                { emoji: '🥊', shortcodes: ['boxing_glove'] },
                { emoji: '🥋', shortcodes: ['martial_arts_uniform'] },
                { emoji: '🥅', shortcodes: ['goal_net'] },
                { emoji: '⛸️', shortcodes: ['ice_skate'] },
                { emoji: '🎿', shortcodes: ['ski'] },
                { emoji: '🛷', shortcodes: ['sled'] },
                { emoji: '🏃', shortcodes: ['run', 'running'] },
                { emoji: '🚶', shortcodes: ['walk'] },
                { emoji: '🏊', shortcodes: ['swim', 'swimming'] },
                { emoji: '🏄', shortcodes: ['surfing'] },
                { emoji: '🚣', shortcodes: ['rowboat'] },
                { emoji: '🚴', shortcodes: ['cycle', 'biking', 'bicycle'] },
                { emoji: '🚵', shortcodes: ['mountain_biking'] },
                { emoji: '🏋️', shortcodes: ['weight_lifting'] },
                { emoji: '🧘', shortcodes: ['person_in_lotus_position'] },
                { emoji: '💃', shortcodes: ['dancer'] },
                { emoji: '🕺', shortcodes: ['man_dancing'] },
                { emoji: '🎭', shortcodes: ['performing_arts'] },
                { emoji: '🎨', shortcodes: ['art'] },
                { emoji: '🎵', shortcodes: ['musical_note'] },
                { emoji: '🎶', shortcodes: ['notes'] },
                { emoji: '🎸', shortcodes: ['guitar'] },
                { emoji: '🥁', shortcodes: ['drum'] },
                { emoji: '🎻', shortcodes: ['violin'] },
                { emoji: '🎲', shortcodes: ['game_die'] },
                { emoji: '🎯', shortcodes: ['dart'] },
                { emoji: '🎳', shortcodes: ['bowling'] },
                { emoji: '🎰', shortcodes: ['slot_machine'] },
                { emoji: '🥇', shortcodes: ['medal_sport', 'medal_sports', 'first_place_medal'] },
                { emoji: '🥈', shortcodes: ['second_place_medal'] },
                { emoji: '🥉', shortcodes: ['third_place_medal'] },
                { emoji: '🏆', shortcodes: ['trophy'] }
            ],

            travelAndPlaces: [
                { emoji: '✈️', shortcodes: ['airplane'] },
                { emoji: '🛩️', shortcodes: ['small_airplane'] },
                { emoji: '🚁', shortcodes: ['helicopter'] },
                { emoji: '🚀', shortcodes: ['rocket'] },
                { emoji: '🚆', shortcodes: ['train'] },
                { emoji: '🚇', shortcodes: ['metro'] },
                { emoji: '🚊', shortcodes: ['tram'] },
                { emoji: '🚗', shortcodes: ['car'] },
                { emoji: '🚕', shortcodes: ['taxi'] },
                { emoji: '🚙', shortcodes: ['blue_car'] },
                { emoji: '🚌', shortcodes: ['bus'] },
                { emoji: '🚐', shortcodes: ['minibus'] },
                { emoji: '🚚', shortcodes: ['truck'] },
                { emoji: '🚜', shortcodes: ['tractor'] },
                { emoji: '🏍️', shortcodes: ['motorcycle'] },
                { emoji: '🚲', shortcodes: ['bike'] },
                { emoji: '🛴', shortcodes: ['kick_scooter'] },
                { emoji: '🦽', shortcodes: ['wheelchair'] },
                { emoji: '🚢', shortcodes: ['ship'] },
                { emoji: '⛴️', shortcodes: ['ferry'] },
                { emoji: '⛵', shortcodes: ['sailboat'] },
                { emoji: '🛶', shortcodes: ['canoe'] },
                { emoji: '⚓', shortcodes: ['anchor'] },
                { emoji: '⛽', shortcodes: ['fuelpump'] },
                { emoji: '🚥', shortcodes: ['traffic_light'] },
                { emoji: '🚧', shortcodes: ['construction'] },
                { emoji: '🏨', shortcodes: ['hotel'] },
                { emoji: '🏠', shortcodes: ['house'] },
                { emoji: '🏡', shortcodes: ['house_with_garden'] },
                { emoji: '🏢', shortcodes: ['office'] },
                { emoji: '🏬', shortcodes: ['department_store'] },
                { emoji: '🏫', shortcodes: ['school'] },
                { emoji: '🏥', shortcodes: ['hospital'] },
                { emoji: '🏦', shortcodes: ['bank'] },
                { emoji: '🏣', shortcodes: ['post_office'] },
                { emoji: '🏟️', shortcodes: ['stadium'] },
                { emoji: '🏛️', shortcodes: ['classical_building'] },
                { emoji: '🏭', shortcodes: ['factory'] },
                { emoji: '🏰', shortcodes: ['castle'] },
                { emoji: '🏯', shortcodes: ['japanese_castle'] },
                { emoji: '🌉', shortcodes: ['bridge'] },
                { emoji: '🎡', shortcodes: ['ferris_wheel'] },
                { emoji: '🎢', shortcodes: ['roller_coaster'] },
                { emoji: '🏖️', shortcodes: ['beach', 'beach_with_umbrella'] },
                { emoji: '🏜️', shortcodes: ['desert'] },
                { emoji: '🏝️', shortcodes: ['island'] },
                { emoji: '⛰️', shortcodes: ['mountain'] },
                { emoji: '🌋', shortcodes: ['volcano'] },
                { emoji: '🏕️', shortcodes: ['camping'] },
                { emoji: '⛺', shortcodes: ['tent'] },
                { emoji: '🏞️', shortcodes: ['national_park'] }
            ],

            weatherAndNatureExtras: [
                { emoji: '☀️', shortcodes: ['sun'] },
                { emoji: '🌞', shortcodes: ['sun_with_face'] },
                { emoji: '☁️', shortcodes: ['cloud'] },
                { emoji: '🌧️', shortcodes: ['cloud_with_rain', 'rain'] },
                { emoji: '❄️', shortcodes: ['snow', 'snowflake'] },
                { emoji: '☃️', shortcodes: ['snowman'] },
                { emoji: '🌩️', shortcodes: ['thunder', 'lightning'] },
                { emoji: '⚡', shortcodes: ['zap'] },
                { emoji: '🌪️', shortcodes: ['tornado'] },
                { emoji: '🌫️', shortcodes: ['fog'] },
                { emoji: '🌈', shortcodes: ['rainbow'] },
                { emoji: '☔', shortcodes: ['umbrella'] },
                { emoji: '💧', shortcodes: ['droplet'] },
                { emoji: '🌊', shortcodes: ['ocean'] },
                { emoji: '🌙', shortcodes: ['moon', 'crescent_moon'] },
                { emoji: '🌑', shortcodes: ['new_moon'] },
                { emoji: '🌒', shortcodes: ['waxing_crescent_moon'] },
                { emoji: '🌓', shortcodes: ['first_quarter_moon'] },
                { emoji: '🌔', shortcodes: ['waxing_gibbous_moon'] },
                { emoji: '🌕', shortcodes: ['full_moon'] },
                { emoji: '🌖', shortcodes: ['waning_gibbous_moon'] },
                { emoji: '🌗', shortcodes: ['last_quarter_moon'] },
                { emoji: '🌘', shortcodes: ['waning_crescent_moon'] },
                { emoji: '🌃', shortcodes: ['starry_night'] }
            ],

            techAndObjectsExtra: [
                { emoji: '🖱️', shortcodes: ['computer_mouse'] },
                { emoji: '🖲️', shortcodes: ['trackball'] },
                { emoji: '🕹️', shortcodes: ['joystick'] },
                { emoji: '🎮', shortcodes: ['video_game'] },
                { emoji: '📀', shortcodes: ['dvd'] },
                { emoji: '💿', shortcodes: ['cd'] },
                { emoji: '💾', shortcodes: ['floppy_disk'] },
                { emoji: '📟', shortcodes: ['pager'] },
                { emoji: '📠', shortcodes: ['fax'] },
                { emoji: '📺', shortcodes: ['tv'] },
                { emoji: '📻', shortcodes: ['radio'] },
                { emoji: '🛰️', shortcodes: ['satellite'] },
                { emoji: '📡', shortcodes: ['satellite_antenna'] },
                { emoji: '📽️', shortcodes: ['film_projector', 'projector'] },
                { emoji: '⌚', shortcodes: ['watch'] },
                { emoji: '⏱️', shortcodes: ['timer', 'stopwatch'] },
                { emoji: '⌛', shortcodes: ['hourglass'] },
                { emoji: '⏳', shortcodes: ['hourglass_flowing_sand'] },
                { emoji: '🔦', shortcodes: ['flashlight'] },
                { emoji: '🕯️', shortcodes: ['candle'] },
                { emoji: '💡', shortcodes: ['bulb'] },
                { emoji: '🔌', shortcodes: ['electric_plug', 'usb'] },
                { emoji: '🧮', shortcodes: ['abacus'] },
                { emoji: '🔬', shortcodes: ['microscope'] },
                { emoji: '🔭', shortcodes: ['telescope'] },
                { emoji: '🧪', shortcodes: ['test_tube'] },
                { emoji: '🧫', shortcodes: ['petri_dish'] },
                { emoji: '🧬', shortcodes: ['dna'] },
                { emoji: '💊', shortcodes: ['pill'] },
                { emoji: '💉', shortcodes: ['syringe'] }
            ],

            uiSymbolsExtra: [
                { emoji: '▶️', shortcodes: ['play', 'play_button'] },
                { emoji: '⏸️', shortcodes: ['pause', 'pause_button'] },
                { emoji: '⏹️', shortcodes: ['stop', 'stop_button'] },
                { emoji: '⏺️', shortcodes: ['record', 'record_button'] },
                { emoji: '⏩', shortcodes: ['fast_forward'] },
                { emoji: '⏪', shortcodes: ['rewind'] },
                { emoji: '⏭️', shortcodes: ['next_track_button'] },
                { emoji: '⏮️', shortcodes: ['previous_track_button'] },
                { emoji: '🔂', shortcodes: ['repeat_one'] },
                { emoji: '🔁', shortcodes: ['repeat'] },
                { emoji: '🔀', shortcodes: ['shuffle'] },
                { emoji: 'ℹ️', shortcodes: ['info'] },
                { emoji: '⬆️', shortcodes: ['arrow_up'] },
                { emoji: '⬇️', shortcodes: ['arrow_down'] },
                { emoji: '⬅️', shortcodes: ['arrow_left'] },
                { emoji: '➡️', shortcodes: ['arrow_right'] },
                { emoji: '↖️', shortcodes: ['arrow_upper_left'] },
                { emoji: '↗️', shortcodes: ['arrow_upper_right'] },
                { emoji: '↙️', shortcodes: ['arrow_lower_left'] },
                { emoji: '↘️', shortcodes: ['arrow_lower_right'] },
                { emoji: '↔️', shortcodes: ['left_right_arrow'] },
                { emoji: '↕️', shortcodes: ['arrow_up_down'] },
                { emoji: '↩️', shortcodes: ['leftwards_arrow_with_hook'] },
                { emoji: '↪️', shortcodes: ['arrow_right_hook'] },
                { emoji: '➕', shortcodes: ['heavy_plus_sign'] },
                { emoji: '➖', shortcodes: ['heavy_minus_sign'] },
                { emoji: '➗', shortcodes: ['heavy_division_sign'] },
                { emoji: '✖️', shortcodes: ['heavy_multiplication_x'] }
            ],

            communicationAndMedia: [
                { emoji: '📨', shortcodes: ['incoming_envelope'] },
                { emoji: '📫', shortcodes: ['mailbox'] },
                { emoji: '📪', shortcodes: ['mailbox_closed'] },
                { emoji: '📬', shortcodes: ['mailbox_with_mail'] },
                { emoji: '📮', shortcodes: ['postbox'] },
                { emoji: '📢', shortcodes: ['loudspeaker'] },
                { emoji: '📣', shortcodes: ['mega', 'megaphone'] },
                { emoji: '💬', shortcodes: ['speech_balloon'] },
                { emoji: '💭', shortcodes: ['thought_balloon'] },
                { emoji: '🗨️', shortcodes: ['left_speech_bubble'] },
                { emoji: '🗯️', shortcodes: ['right_anger_bubble'] },
                { emoji: '📞', shortcodes: ['telephone_receiver'] },
                { emoji: '📲', shortcodes: ['calling'] },
                { emoji: '📯', shortcodes: ['postal_horn'] },
                { emoji: '📰', shortcodes: ['newspaper'] },
                { emoji: '🗞️', shortcodes: ['rolled_up_newspaper'] }
            ],

            flagsBasic: [
                { emoji: '🇩🇪', shortcodes: ['flag_de'] },
                { emoji: '🇦🇹', shortcodes: ['flag_at'] },
                { emoji: '🇨🇭', shortcodes: ['flag_ch'] },
                { emoji: '🇺🇸', shortcodes: ['flag_us'] },
                { emoji: '🇬🇧', shortcodes: ['flag_gb', 'flag_uk'] },
                { emoji: '🇫🇷', shortcodes: ['flag_fr'] },
                { emoji: '🇪🇸', shortcodes: ['flag_es'] },
                { emoji: '🇮🇹', shortcodes: ['flag_it'] },
                { emoji: '🇵🇹', shortcodes: ['flag_pt'] },
                { emoji: '🇳🇱', shortcodes: ['flag_nl'] },
                { emoji: '🇧🇪', shortcodes: ['flag_be'] },
                { emoji: '🇱🇺', shortcodes: ['flag_lu'] },
                { emoji: '🇵🇱', shortcodes: ['flag_pl'] },
                { emoji: '🇨🇿', shortcodes: ['flag_cz'] },
                { emoji: '🇸🇰', shortcodes: ['flag_sk'] },
                { emoji: '🇭🇺', shortcodes: ['flag_hu'] },
                { emoji: '🇷🇴', shortcodes: ['flag_ro'] },
                { emoji: '🇧🇬', shortcodes: ['flag_bg'] },
                { emoji: '🇭🇷', shortcodes: ['flag_hr'] },
                { emoji: '🇸🇮', shortcodes: ['flag_si'] },
                { emoji: '🇬🇷', shortcodes: ['flag_gr'] },
                { emoji: '🇹🇷', shortcodes: ['flag_tr'] },
                { emoji: '🇺🇦', shortcodes: ['flag_ua'] },
                { emoji: '🇷🇺', shortcodes: ['flag_ru'] },
                { emoji: '🇨🇦', shortcodes: ['flag_ca'] },
                { emoji: '🇲🇽', shortcodes: ['flag_mx'] },
                { emoji: '🇧🇷', shortcodes: ['flag_br'] },
                { emoji: '🇦🇷', shortcodes: ['flag_ar'] },
                { emoji: '🇨🇱', shortcodes: ['flag_cl'] },
                { emoji: '🇨🇴', shortcodes: ['flag_co'] },
                { emoji: '🇦🇺', shortcodes: ['flag_au'] },
                { emoji: '🇳🇿', shortcodes: ['flag_nz'] },
                { emoji: '🇮🇳', shortcodes: ['flag_in'] },
                { emoji: '🇨🇳', shortcodes: ['flag_cn'] },
                { emoji: '🇯🇵', shortcodes: ['flag_jp'] },
                { emoji: '🇰🇷', shortcodes: ['flag_kr'] },
                { emoji: '🇹🇭', shortcodes: ['flag_th'] },
                { emoji: '🇻🇳', shortcodes: ['flag_vn'] },
                { emoji: '🇮🇩', shortcodes: ['flag_id'] },
                { emoji: '🇵🇭', shortcodes: ['flag_ph'] },
                { emoji: '🇲🇾', shortcodes: ['flag_my'] },
                { emoji: '🇸🇬', shortcodes: ['flag_sg'] },
                { emoji: '🇿🇦', shortcodes: ['flag_za'] }
            ]
        }
    };

    const pluginFunctions = {
        globalEventsBound: false,
        _shortcodeMapCache: null,

        setSettings($wrapper, settings) {
            $wrapper.data(DATA_KEY, settings);
        },

        getSettings($wrapper) {
            return $wrapper.data(DATA_KEY) || null;
        },

        getDropdown($wrapper) {
            return $wrapper.find(`.${DROPDOWN_CLASS}`).first();
        },

        getTarget(settings) {
            if (!settings || !settings.targetInput) return $();
            return $(settings.targetInput).first();
        },

        isTextInput($el) {
            if (!$el || !$el.length) return false;
            const tag = ($el[0].tagName || '').toLowerCase();
            return tag === 'input' || tag === 'textarea';
        },

        isContentEditable($el) {
            return !!($el && $el.length && $el[0].isContentEditable);
        },

        normalizeDomInput(root) {
            if (!root) return $();
            if (root.jquery) return root;
            if (root instanceof Element || root === document || root === window) return $(root);
            if (typeof root === 'object' && typeof root.length === 'number') return $(root);
            if (typeof root === 'string') {
                try {
                    return $(root);
                } catch (e) {
                    return $();
                }
            }
            return $();
        },

        escapeHtml(str) {
            return String(str)
                .replaceAll('&', '&amp;')
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('"', '&quot;')
                .replaceAll("'", '&#039;');
        },

        getEmojiData() {
            return $.bsEmojiPicker.emojiData || {};
        },

        getAsciiMap() {
            return Array.isArray($.bsEmojiPicker.asciiMap) ? $.bsEmojiPicker.asciiMap : [];
        },

        buildShortcodeMap() {
            const cache = Object.create(null);
            const data = this.getEmojiData();

            Object.keys(data).forEach((categoryKey) => {
                const list = Array.isArray(data[categoryKey]) ? data[categoryKey] : [];
                list.forEach((item) => {
                    if (!item || typeof item.emoji !== 'string') return;
                    const codes = Array.isArray(item.shortcodes) ? item.shortcodes : [];
                    codes.forEach((code) => {
                        const key = String(code || '').trim().toLowerCase();
                        if (!key) return;
                        if (!(key in cache)) {
                            cache[key] = item.emoji;
                        }
                    });
                });
            });

            this._shortcodeMapCache = cache;
            return cache;
        },

        getShortcodeMap() {
            if (this._shortcodeMapCache) return this._shortcodeMapCache;
            return this.buildShortcodeMap();
        },

        invalidateCaches() {
            this._shortcodeMapCache = null;
        },

        getCategoryOrder(settings) {
            const labels = settings && settings.labels ? settings.labels : $.bsEmojiPicker.defaults.labels;
            return Object.keys(labels || {});
        },

        buildCategoryIndex(settings) {
            const labels = settings.labels || {};
            const data = this.getEmojiData();
            const order = this.getCategoryOrder(settings);
            const categories = [];
            const pushed = new Set();

            const appendCategory = (key) => {
                const list = Array.isArray(data[key]) ? data[key] : [];
                categories.push({
                    key,
                    label: labels[key] || key,
                    items: list
                        .filter((item) => item && typeof item.emoji === 'string')
                        .map((item) => ({
                            emoji: item.emoji,
                            shortcodes: Array.isArray(item.shortcodes) ? item.shortcodes.slice() : []
                        }))
                });
                pushed.add(key);
            };

            order.forEach((key) => appendCategory(key));

            Object.keys(data)
                .filter((key) => !pushed.has(key))
                .sort((a, b) => String(a).localeCompare(String(b)))
                .forEach((key) => appendCategory(key));

            return categories;
        },

        replaceShortcodes(str) {
            const shortcodeMap = this.getShortcodeMap();

            return String(str).replace(/:([a-z0-9_+\-]+):/gi, (match, code) => {
                const normalized = String(code || '').toLowerCase();
                return shortcodeMap[normalized] || match;
            });
        },

        replaceAscii(str) {
            let output = String(str);
            const rules = this.getAsciiMap();

            for (const entry of rules) {
                if (!entry || !(entry.re instanceof RegExp) || typeof entry.emoji !== 'string') continue;
                output = output.replace(entry.re, entry.emoji);
            }

            return output;
        },

        emojifyText(str) {
            if (typeof str !== 'string') {
                throw new TypeError('emojifyText expects a string');
            }

            let output = str;
            output = this.replaceShortcodes(output);
            output = this.replaceAscii(output);
            return output;
        },

        emojifyHtml(html) {
            if (typeof html !== 'string') {
                throw new TypeError('emojifyHtml expects a string');
            }

            const $tmp = $('<div>').html(html);
            this.emojifyDom($tmp);
            return $tmp.html();
        },

        emojifyDom(root) {
            const $list = this.normalizeDomInput(root);

            if (!$list.length) {
                throw new TypeError('emojifyDom expects DOM, jQuery, NodeList, array-like or selector');
            }

            $list.each((_, node) => {
                const el = node;
                if (!el) return;

                if (this.isTextInput($(el)) || this.isContentEditable($(el))) {
                    this.emojifyTarget($(el));
                    return;
                }

                const walker = document.createTreeWalker(
                    el,
                    NodeFilter.SHOW_TEXT,
                    {
                        acceptNode(textNode) {
                            const parent = textNode.parentNode;
                            if (!parent) return NodeFilter.FILTER_REJECT;

                            const tag = (parent.nodeName || '').toLowerCase();
                            if (
                                tag === 'script' ||
                                tag === 'style' ||
                                tag === 'noscript' ||
                                tag === 'textarea' ||
                                tag === 'template' ||
                                tag === 'input'
                            ) {
                                return NodeFilter.FILTER_REJECT;
                            }

                            return NodeFilter.FILTER_ACCEPT;
                        }
                    }
                );

                const nodes = [];
                let current;
                while ((current = walker.nextNode())) {
                    nodes.push(current);
                }

                for (const textNode of nodes) {
                    const original = textNode.nodeValue;
                    const replaced = this.emojifyText(original);
                    if (replaced !== original) {
                        textNode.nodeValue = replaced;
                    }
                }
            });

            return $list;
        },

        emojifyContenteditable($editable) {
            if (!this.isContentEditable($editable)) {
                throw new TypeError('Invalid contenteditable target');
            }

            const el = $editable[0];
            const selection = window.getSelection();

            let startNode = null;
            let startOffset = 0;

            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                if (el.contains(range.startContainer)) {
                    startNode = range.startContainer;
                    startOffset = range.startOffset;
                }
            }

            const walker = document.createTreeWalker(
                el,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode(textNode) {
                        const parent = textNode.parentNode;
                        if (!parent) return NodeFilter.FILTER_REJECT;

                        const tag = (parent.nodeName || '').toLowerCase();
                        if (
                            tag === 'script' ||
                            tag === 'style' ||
                            tag === 'noscript' ||
                            tag === 'textarea' ||
                            tag === 'template'
                        ) {
                            return NodeFilter.FILTER_REJECT;
                        }

                        return NodeFilter.FILTER_ACCEPT;
                    }
                }
            );

            const nodes = [];
            let current;
            while ((current = walker.nextNode())) {
                nodes.push(current);
            }

            let changed = false;
            let newCaretNode = null;
            let newCaretOffset = 0;

            for (const textNode of nodes) {
                const original = textNode.nodeValue;
                const replaced = this.emojifyText(original);

                if (startNode === textNode) {
                    const left = original.slice(0, startOffset);
                    newCaretOffset = this.emojifyText(left).length;
                    newCaretNode = textNode;
                }

                if (replaced !== original) {
                    textNode.nodeValue = replaced;
                    changed = true;
                }
            }

            if (changed && selection && newCaretNode && el.contains(newCaretNode)) {
                try {
                    const safeOffset = Math.min(newCaretOffset, newCaretNode.nodeValue.length);
                    const newRange = document.createRange();
                    newRange.setStart(newCaretNode, safeOffset);
                    newRange.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(newRange);
                } catch (e) {
                    // ignore caret restore failure
                }
            }

            return $editable;
        },

        emojifyTarget($target) {
            if (!$target || !$target.length) {
                throw new TypeError('Invalid target');
            }

            if (this.isTextInput($target)) {
                const value = String($target.val() ?? '');
                const start = $target.prop('selectionStart') ?? value.length;
                const end = $target.prop('selectionEnd') ?? value.length;

                const before = value.slice(0, start);
                const middle = value.slice(start, end);
                const after = value.slice(end);

                const newBefore = this.emojifyText(before);
                const newMiddle = this.emojifyText(middle);
                const newAfter = this.emojifyText(after);

                const newValue = newBefore + newMiddle + newAfter;

                if (newValue !== value) {
                    $target.val(newValue);
                    const newCursor = newBefore.length + newMiddle.length;
                    $target.prop('selectionStart', newCursor);
                    $target.prop('selectionEnd', newCursor);
                }

                $target.addClass(LISTENER_CLASS);
                return $target;
            }

            if (this.isContentEditable($target)) {
                $target.addClass(LISTENER_CLASS);
                return this.emojifyContenteditable($target);
            }

            throw new TypeError('Target must be input, textarea or contenteditable');
        },

        insertEmojiAtCursorTextInput($target, emoji) {
            const value = String($target.val() ?? '');
            const start = $target.prop('selectionStart') ?? value.length;
            const end = $target.prop('selectionEnd') ?? value.length;
            const newValue = value.slice(0, start) + emoji + value.slice(end);
            const newCursor = start + emoji.length;

            $target.focus();
            $target.val(newValue);
            $target.prop('selectionStart', newCursor);
            $target.prop('selectionEnd', newCursor);
            $target.trigger('input');
        },

        insertEmojiAtCursorContenteditable($editable, emoji) {
            const el = $editable[0];
            if (!el || !el.isContentEditable) {
                throw new TypeError('Invalid contenteditable target');
            }

            el.focus();

            const selection = window.getSelection();
            let range;

            if (selection && selection.rangeCount > 0) {
                range = selection.getRangeAt(0);
            } else {
                range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
            }

            if (!el.contains(range.commonAncestorContainer)) {
                range.selectNodeContents(el);
                range.collapse(false);
            }

            range.deleteContents();

            const node = document.createTextNode(emoji);
            range.insertNode(node);

            const newRange = document.createRange();
            newRange.setStartAfter(node);
            newRange.collapse(true);

            if (selection) {
                selection.removeAllRanges();
                selection.addRange(newRange);
            }

            $editable.trigger('input');
        },

        insertEmojiAtCursor($target, emoji) {
            if (!$target || !$target.length) {
                throw new TypeError('Invalid target');
            }

            if (this.isTextInput($target)) {
                this.insertEmojiAtCursorTextInput($target, emoji);
                return;
            }

            if (this.isContentEditable($target)) {
                this.insertEmojiAtCursorContenteditable($target, emoji);
                return;
            }

            throw new TypeError('Target must be input, textarea or contenteditable');
        },

        isOnlyEmoji(input) {
            const text = String(input ?? '').trim();
            if (!text) return false;

            const withoutSpaces = text.replace(/\s+/g, '');
            const nonEmojiChars = withoutSpaces.replace(
                /(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\u200D)+/gu,
                ''
            );

            return nonEmojiChars.length === 0;
        },

        buildDropdown($wrapper) {
            const settings = this.getSettings($wrapper);
            $wrapper.empty();

            const index = $(`body .${DROPDOWN_CLASS}`).length + 1;

            const $dropdown = $('<div>', {
                class: `dropdown ${DROPDOWN_CLASS}`,
                'data-index': index
            }).appendTo($wrapper);

            const dropdownToggleClass = settings.btnShowToggle ? ' dropdown-toggle' : '';
            const buttonHtml = settings.btnText || `<i class="${this.escapeHtml(settings.btnIconClass)}"></i>`;

            $('<button>', {
                class: `${settings.btnClass}${dropdownToggleClass}`,
                type: 'button',
                'data-bs-toggle': 'dropdown',
                'aria-expanded': 'false',
                html: buttonHtml
            }).appendTo($dropdown);

            const $menu = $('<div>', {
                class: 'dropdown-menu p-0'
            }).appendTo($dropdown);

            const $menuWrapper = $('<div>', {
                class: 'dropdown-emoji-menu-wrapper',
                style: 'min-width:340px;max-width:520px;max-height:400px;overflow-y:auto;'
            }).appendTo($menu);

            const $searchWrap = $('<div>', {
                class: 'p-2 border-bottom sticky-top bg-white'
            }).appendTo($menuWrapper);

            $('<input>', {
                type: 'search',
                class: 'form-control form-control-sm js-emoji-search',
                placeholder: 'Search emoji…',
                autocomplete: 'off'
            }).appendTo($searchWrap);

            $('<div>', {
                class: 'dropdown-emoji-list'
            }).appendTo($menuWrapper);

            this.fillDropdown($wrapper);
        },

        fillDropdown($wrapper, query = '') {
            const settings = this.getSettings($wrapper);
            const $dropdown = this.getDropdown($wrapper);
            const $list = $dropdown.find('.dropdown-emoji-list').first();
            const index = this.buildCategoryIndex(settings);
            const q = String(query || '').trim().toLowerCase();

            $list.empty();

            let anyShown = false;

            index.forEach(({ label, items }) => {
                const filtered = q
                    ? items.filter((item) => {
                        const haystack = [
                            item.emoji,
                            ...(Array.isArray(item.shortcodes) ? item.shortcodes : [])
                        ].join(' ').toLowerCase();

                        return haystack.includes(q);
                    })
                    : items;

                if (!filtered.length) return;

                anyShown = true;

                $('<div>', {
                    class: 'dropdown-header sticky-top text-bg-light',
                    text: label
                }).appendTo($list);

                const $grid = $('<div>', {
                    class: 'd-flex flex-wrap gap-1 px-1 pb-1'
                }).appendTo($list);

                filtered.forEach(({ emoji, shortcodes }) => {
                    const title = (shortcodes || []).map((code) => `:${code}:`).join('  |  ');

                    $('<button>', {
                        type: 'button',
                        class: 'd-inline-flex justify-content-center align-items-center border-0 rounded js-emoji-insert bg-transparent',
                        style: 'cursor:pointer;width:2rem;height:2rem;font-size:18px;',
                        'data-emoji': emoji,
                        title,
                        'aria-label': title || emoji,
                        text: emoji
                    }).appendTo($grid);
                });
            });

            if (!anyShown) {
                $('<div>', {
                    class: 'text-muted small px-2 py-2',
                    text: 'No matches'
                }).appendTo($list);
            }
        },

        getAllUniqueEmojis() {
            const data = this.getEmojiData();
            const out = [];
            const seen = new Set();

            Object.keys(data).forEach((key) => {
                const list = Array.isArray(data[key]) ? data[key] : [];
                list.forEach((item) => {
                    if (!item || typeof item.emoji !== 'string') return;
                    if (seen.has(item.emoji)) return;
                    seen.add(item.emoji);
                    out.push(item.emoji);
                });
            });

            this.getAsciiMap().forEach((item) => {
                if (!item || typeof item.emoji !== 'string') return;
                if (seen.has(item.emoji)) return;
                seen.add(item.emoji);
                out.push(item.emoji);
            });

            return out;
        },

        showDemo($wrapper, count = 100, time = 1000) {
            const uniqueEmojis = this.getAllUniqueEmojis();
            if (!uniqueEmojis.length) return;

            $wrapper.addClass('position-relative overflow-hidden');

            let createdCount = 0;
            const interval = setInterval(() => {
                if (createdCount >= count) {
                    clearInterval(interval);
                    return;
                }

                const emoji = uniqueEmojis[Math.floor(Math.random() * uniqueEmojis.length)];
                const fontSize = Math.random() * 3 + 1;
                const fontSizePx = fontSize * 16;
                const wrapperWidth = $wrapper.width() || 0;
                const wrapperHeight = $wrapper.height() || 0;
                const top = Math.random() * Math.max(wrapperHeight - fontSizePx, 0) + fontSizePx / 2;
                const left = Math.random() * Math.max(wrapperWidth - fontSizePx, 0) + fontSizePx / 2;

                $('<span>', {
                    text: emoji,
                    class: 'emoji-demo',
                    css: {
                        zIndex: -1,
                        position: 'absolute',
                        fontSize: `${fontSize}rem`,
                        top: `${top}px`,
                        left: `${left}px`,
                        transform: `translate(-50%, -50%) rotate(${Math.random() * 60 - 30}deg)`
                    }
                }).appendTo($wrapper);

                createdCount += 1;
            }, time);
        },

        bindGlobalEvents() {
            if (this.globalEventsBound) return;

            $(document)
                .on('show.bs.dropdown', `.${DROPDOWN_CLASS}`, function () {
                    $(this).find('.dropdown-emoji-menu-wrapper').stop(true).animate({ scrollTop: 0 }, 150);
                    $(this).find('.js-emoji-search').val('');
                })
                .on('shown.bs.dropdown', `.${DROPDOWN_CLASS}`, function () {
                    $(this).find('.js-emoji-search').trigger('focus');
                })
                .on('input', `.${WRAPPER_CLASS} .js-emoji-search`, (e) => {
                    const $input = $(e.currentTarget);
                    const $wrapper = $input.closest(`.${WRAPPER_CLASS}`);
                    this.fillDropdown($wrapper, $input.val());
                })
                .on('input paste change', `.${LISTENER_CLASS}`, (e) => {
                    try {
                        this.emojifyTarget($(e.currentTarget));
                    } catch (err) {
                        console.error(err);
                    }
                })
                .on('click', `.${WRAPPER_CLASS} [data-emoji]`, (e) => {
                    e.preventDefault();

                    const $button = $(e.currentTarget);
                    const $wrapper = $button.closest(`.${WRAPPER_CLASS}`);
                    const settings = this.getSettings($wrapper);
                    if (!settings) return;

                    const emoji = String($button.data('emoji') || '');

                    if (typeof settings.onClickEmoji === 'function') {
                        settings.onClickEmoji(emoji);
                    }

                    const $target = this.getTarget(settings);
                    if ($target.length) {
                        try {
                            this.insertEmojiAtCursor($target, emoji);
                        } catch (err) {
                            console.error(err);
                        }
                    }
                });

            this.globalEventsBound = true;
        }
    };

    $.bsEmojiPicker.rebuildShortcodeMap = function () {
        pluginFunctions.invalidateCaches();
        return pluginFunctions.getShortcodeMap();
    };

    $.bsEmojiPicker.getShortcodeMap = function () {
        return $.extend({}, pluginFunctions.getShortcodeMap());
    };

    $.bsEmojiPicker.emojifyText = function (text) {
        return pluginFunctions.emojifyText(text);
    };

    $.bsEmojiPicker.emojify = function (input) {
        if (input == null) {
            throw new TypeError('Invalid input');
        }

        if (typeof input === 'string') {
            const trimmed = input.trim();

            const looksLikeHtml = /<[^>]+>/.test(trimmed);
            if (looksLikeHtml) {
                return pluginFunctions.emojifyHtml(input);
            }

            try {
                const $maybeDom = $(input);

                if ($maybeDom.length && (
                    trimmed.startsWith('.') ||
                    trimmed.startsWith('#') ||
                    trimmed.startsWith('[') ||
                    trimmed.includes(' ') ||
                    trimmed === 'body' ||
                    trimmed === 'html'
                )) {
                    return pluginFunctions.emojifyDom($maybeDom);
                }
            } catch (e) {
                // ignore selector parse errors
            }

            return pluginFunctions.emojifyText(input);
        }

        if (input.jquery) {
            return pluginFunctions.emojifyDom(input);
        }

        if (input instanceof Element || input === document || input === window) {
            return pluginFunctions.emojifyDom(input);
        }

        if (typeof input === 'object' && typeof input.length === 'number') {
            return pluginFunctions.emojifyDom(input);
        }

        throw new TypeError('Unsupported input type');
    };

    $.bsEmojiPicker.emojifyHtml = function (html) {
        return pluginFunctions.emojifyHtml(html);
    };

    $.bsEmojiPicker.emojifyDom = function (root) {
        return pluginFunctions.emojifyDom(root);
    };

    $.bsEmojiPicker.emojifyElement = function ($target) {
        return pluginFunctions.emojifyTarget($target);
    };

    $.bsEmojiPicker.isOnlyEmoji = function (text) {
        return pluginFunctions.isOnlyEmoji(text);
    };

    $.bsEmojiPicker.showDemo = function ($wrapper, count = 100, time = 1000) {
        return pluginFunctions.showDemo($wrapper, count, time);
    };

    $.fn.bsEmojiPicker = function (methodOrOptions, ...params) {
        if (!this.length) return this;

        if (typeof methodOrOptions === 'string') {
            const method = methodOrOptions;

            if (method === 'rebuild') {
                return this.each(function () {
                    const $wrapper = $(this);
                    const settings = pluginFunctions.getSettings($wrapper);
                    if (!settings) return;
                    pluginFunctions.buildDropdown($wrapper);
                });
            }

            if (method === 'search') {
                const query = params[0] || '';
                return this.each(function () {
                    const $wrapper = $(this);
                    pluginFunctions.fillDropdown($wrapper, query);
                });
            }

            if (typeof pluginFunctions[method] !== 'function') {
                throw new Error(`Unknown method "${method}"`);
            }

            const result = pluginFunctions[method](...params);
            return typeof result === 'undefined' ? this : result;
        }

        return this.each(function () {
            const $wrapper = $(this);
            let settings = pluginFunctions.getSettings($wrapper);

            if (!settings) {
                const options = typeof methodOrOptions === 'object' && methodOrOptions !== null
                    ? methodOrOptions
                    : {};

                settings = $.extend(true, {}, $.bsEmojiPicker.defaults, options);

                $wrapper.addClass(WRAPPER_CLASS);
                pluginFunctions.setSettings($wrapper, settings);
                pluginFunctions.buildDropdown($wrapper);
                pluginFunctions.bindGlobalEvents();

                const $target = pluginFunctions.getTarget(settings);
                if ($target.length) {
                    $target.addClass(LISTENER_CLASS);
                    try {
                        pluginFunctions.emojifyTarget($target);
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
        });
    };
}(jQuery));