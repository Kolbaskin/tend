<h2>Направление торгов</h2>

<p>Внимание! При сохранении изменений настроек на этой странице, доступ к участию в торгах будет автоматически заблокирован до момента одобрения изменений администрацией торговой площадки.</p>

<form method="post">
    <table>
        <tpl for="items">
            <tr>
                <th colspan="2">{name}</th>
            </tr>
            <tpl for="works">
                <tr>
                    <td>{name}</td>
                    <td><input type="checkbox" name="works" value="{_id}" <tpl if="checked">checked</tpl>></td>
                </tr>
            </tpl>
        </tpl>
    </table>

    <button type="submit">сохранить</button>

</form>